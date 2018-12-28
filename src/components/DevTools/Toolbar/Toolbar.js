import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Divider, withStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Draggable from 'react-draggable';
import * as themes from 'redux-devtools-themes';
import {
  MdCheck,
  MdFiberManualRecord,
  MdChevronRight,
  MdCheckBox,
  MdCheckBoxOutlineBlank
} from 'react-icons/md';

import { isTrue } from 'shared/util';

import { getStateStats, getClientStats } from 'utils/app';

import {
  devPersistState,
  devStartActionSet,
  devEndActionSet,
  devDoAction,
  devUpdateSetting
} from 'actions/dev';

import {
  hudPersistStateSelector,
  commonActionSetsSelector,
  viewActionSetsSelector,
} from 'selectors/dev';

import Button from './Button';
import ContextMenu from './ContextMenu';
import Notification from './Notification';
import styles from './styles';

class Toolbar extends Component {
  static defaultProps = {
    devConfig: {
      showChart: false
    },
    theme: 'twilight',
    commonSets: null,
    viewSets: null,
    currentView: '--'
  };

  static propTypes = {
    classes          : PropTypes.instanceOf(Object).isRequired,
    appConfig        : PropTypes.instanceOf(Object).isRequired,
    devConfig        : PropTypes.instanceOf(Object),
    commonSets       : PropTypes.instanceOf(Object),
    viewSets         : PropTypes.instanceOf(Object),
    theme            : PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    persistedState   : PropTypes.instanceOf(Object).isRequired,
    stateStats       : PropTypes.instanceOf(Object).isRequired,
    clientStats      : PropTypes.instanceOf(Object).isRequired,
    currentView      : PropTypes.string,
    persistState     : PropTypes.func.isRequired,
    doAction         : PropTypes.func.isRequired,
    startActionSet   : PropTypes.func.isRequired,
    executeActionSet : PropTypes.func.isRequired,
    endActionSet     : PropTypes.func.isRequired
  };

  defaultPosition = {
    activeDrags: 0,
    delta: {
      x: 0,
      y: 100
    },
    controlled: false,
    mini: false
  };

  defaultMenuOpen = '';

  menuItems = {
    logger: [{
      label: 'Show Colors',
      name: 'showColors',
    }, {
      label: 'Expand Objects',
      name: 'expandObjects',
    }, {
      label: 'Clear on Reload',
      name: 'clearOnReload',
    }, {
      label: 'Log Requests',
      name: 'logRequests',
    }, {
      label: 'Log Levels',
      name: 'level',
      sublinks: [{
        label: 'Fatal',
        value: 1,
        name: 'level.0'
      }, {
        label: 'Error',
        value: 2,
        name: 'level.1'
      }, {
        label: 'Warn',
        value: 3,
        name: 'level.2'
      }, {
        label: 'Info',
        value: 4,
        name: 'level.3'
      }, {
        label: 'Debug',
        value: 5,
        name: 'level.4'
      }, {
        label: 'Trace',
        value: 6,
        name: 'level.5'
      }]
    }]
  }

  constructor(props) {
    super(props);
    this.getRef = this.getRef.bind(this);
    this.state = {
      progress: 0,
      statusTitle: '',
      statusText: '',
      statusType: 'info',
      position: this.defaultPosition
    };
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    const { viewSets, commonSets, persistedState, devConfig } = this.props;

    // populate logger setting items
    this.menuItems.logger.forEach(item => {
      item.value = _.get(devConfig, `logger.${item.name}`);
    });

    _.merge(this.menuItems, { commonSets, viewSets, persistedState });
    const generatedMenus = this.generateMenus(this.menuItems);
    generatedMenus.logger.onClick = this.handleLoggerClick;
    generatedMenus['logger-level'].onClick = this.handleLoggerLevelClick;
    generatedMenus.viewSets.onClick = (e) => this.handleExecuteActionSet(viewSets, e.target.value);
    generatedMenus.commonSets.onClick = (e) => this.handleExecuteActionSet(commonSets, e.target.value);
    this.setState({
      menus: generatedMenus
    }, () => {
      if (this.defaultMenuOpen) {
        this.showMenuByPath(this.defaultMenuOpen);
      }
    });
  }

  getRef(node) {
    this.node = node;
  }


  _stateUpdated = () => {
    if (this.logStateUpdates) {
      console.log(this.state);
    }
  }

  getTheme = () => {
    const { theme } = this.props;
    if (typeof theme !== 'string') {
      return theme;
    }

    if (typeof themes[theme] !== 'undefined') {
      return themes[theme];
    }

    console.error(`DevTools theme ${theme} not found, defaulting to nicinabox`);
    return themes.nicinabox;
  }

  getMenuIcon = (menu, propOverride) => {
    const { value, parentKey, sublinks } = menu;

    if (/logger.level/.test(parentKey)) {
      const { devConfig: { logger } } = this.props;
      const currLevel = parseInt(propOverride || logger.level, 10);
      const menuValue = parseInt(value, 10);
      if (menuValue === currLevel) {
        return this.menuIcon('check');
      } else if (menuValue > currLevel) {
        return this.menuIcon('levelOff');
      }
      return this.menuIcon('levelOn');
    } else if (sublinks) {
      return this.menuIcon('submenu');
    } else if (/^true$|^on$/i.test(value)) {
      return this.menuIcon('on');
    } else if (/^false$|^off$/i.test(value)) {
      return this.menuIcon('off');
    }
    return false;
  }

  getMenuClass = (menu, propOverride) => {
    const { value, parentKey } = menu;
    const { devConfig: { logger: { level = propOverride } } } = this.props;
    const { classes } = this.props;
    if (/logger.level/.test(parentKey)) {
      if (value === level) {
        return classes.menuTextLevelSelected;
      } else if (value > level) {
        return classes.menuTextLevelOff;
      }
      return classes.menuTextLevelOn;
    } else if (/^true$|^on$/i.test(value)) {
      return classes.menuTextOn;
    } else if (/^false$|^off$/i.test(value)) {
      return classes.menuTextOff;
    }
    return false;
  }

  generateMenu = (menu, menuKey, parentKey) => ({
    visible: false,
    hovering: false,
    x: 0,
    y: 0,
    parentKey,
    items: _.keys(menu).map((key, idx) => {
      const currMenu = { ...menu[key], parentKey: menuKey };
      const { name, sublinks, label, value } = currMenu;
      return {
        name,
        label,
        parentKey: menuKey,
        value : value || key,
        icon:  this.getMenuIcon(currMenu),
        className:  this.getMenuClass(currMenu),
        key : `${menuKey}.${idx}`,
        subMenu: sublinks ? `${menuKey}-${name}` : false
      };
    })
  });

  generateMenus = (menuMap, menuItems = {}, parentKey) => {
    _.keys(menuMap).forEach(menuKey => {
      menuItems[menuKey] = this.generateMenu(menuMap[menuKey], menuKey, parentKey);
      _.filter(menuMap[menuKey], 'sublinks').forEach(subMenu =>
        this.generateMenus({
          [`${menuKey}-${subMenu.name}`]: subMenu.sublinks
        }, menuItems, menuKey));
    });
    return menuItems;
  };


  getAllHovering = () => {
    // console.info('All Hovering', _.filter(this.state.menus, (menu) => menu.hovering));
  }

  getAllSubmenus = (menuKey, submenuList) => {
    const { menus } =  this.state;
    const menu = menus[menuKey];
    menu.items.forEach(({ name, key, subMenu }) => {
      if (subMenu) {
        submenuList.push(subMenu);
        this.getAllSubmenus(subMenu, submenuList);
      }
    });
  }

  handleLoggerClick = (e) => {
    e.stopPropagation();
    const { updateSetting, devConfig, classes } = this.props;
    const { menus } = this.state;
    const { name, value } = e.currentTarget;
    const pKey = _.get(e, 'currentTarget.attributes.data-parentkey.value');
    const clickedItem = _.find(menus[pKey].items, { name });

    let newValue = value;
    if (/^true$|^false$/i.test(newValue)) {
      // if its a boolean value give it a check mark icon
      newValue = !isTrue(value);
    }
    clickedItem.value = newValue;
    clickedItem.icon = this.getMenuIcon(clickedItem);
    clickedItem.className = this.getMenuClass(clickedItem);
    updateSetting(`logger.${name}`, newValue);
  }

  handleLoggerLevelClick = (e) => {
    e.stopPropagation();
    const { updateSetting } = this.props;
    const { menus } = this.state;
    const { value } = e.currentTarget;

    menus['logger-level'].items.forEach(item => {
      item.icon = this.getMenuIcon(item, value);
      item.className = this.getMenuClass(item, value);
    });

    updateSetting('logger.level', value);
  }

  handleClick = (e, parentKey) => {
    e.stopPropagation();
    const { menus } = this.state;
    const pKey = parentKey || _.get(e, 'currentTarget.attributes.data-parentkey.value');
    const pMenu = menus[pKey];
    if (!pMenu.onClick) {
      debugger;
      this.handleClick(e, pMenu.parentKey);
    } else {
      pMenu.onClick(e);
    }
  }

  hoverInMenuItem = (e) => {
    const { menus } = this.state;
    const { parentkey: parentKey, key } = e.currentTarget.dataset;
    const parentMenu = menus[parentKey];
    const menuItem = _.find(parentMenu.items, { key });
    parentMenu.hovering = key;
    menuItem.className = this.getMenuClass(menuItem);
    if (menuItem.subMenu) {
      const subMenu = menus[menuItem.subMenu];
      this.showMenu(e, subMenu, menuItem.subMenu);
    } else {
      this.updateMenu(parentKey, parentMenu);
    }
  }

  hoverOutMenuItem = (e) => {
    const { menus } = this.state;
    const { classes } = this.props;
    const { parentkey: parentKey, key } = _.get(e, 'currentTarget.dataset');
    const newParentKey = _.get(e, 'relatedTarget.dataset.parentkey');
    const parentMenu = menus[parentKey];

    const menuItemOut = _.find(parentMenu.items, { key });
    menuItemOut.hovering = false;
    menuItemOut.className = this.getMenuClass(menuItemOut);

    // TODO: hide all submenus not belonging to menuItem
    if (menuItemOut.subMenu) {
      const subMenu = menus[menuItemOut.subMenu];
      if (newParentKey !== menuItemOut.subMenu) {
        subMenu.hovering = false;
        this.hideMenu(subMenu, menuItemOut.subMenu);
      } else {
        menuItemOut.className = classes.sublinkOpen;
        this.updateMenu(parentKey, parentMenu);
      }
    }
  }

  hoverOutMenu = (e, parentMenu) => {
    const { menus } = this.state;
    const newTarget = _.get(e, 'relatedTarget.dataset.parentkey');
    const outTarget = _.get(e, 'currentTarget.dataset.menukey');
    if (!newTarget) {
      const outMenu = menus[outTarget];
      outMenu.hovering = false;
      window.setTimeout((({ menus, name }) => {
        const om = menus[name];
        if (!om.hovering) {
          const submenus = [];
          this.getAllSubmenus(name, submenus);
          this.hideMenu(om, name);
          submenus.forEach(sm => this.hideMenu(menus[sm], sm));
        }
      }).bind(this, { menus, name: outTarget }), 500);
    }
  }

  showMenuByPath = (path) => {
    const { menus } = this.state;
    const targetMenu = menus[path];
    let { parentKey } = targetMenu;
    const targetMenus = [targetMenu];
    while (parentKey) {
      const parentMenu = menus[parentKey];
      targetMenus.push({ ...parentMenu, name: parentKey });
      ({ parentKey } = parentMenu);
    }
    // const event = { clientX: 100, clientY: 100 };
    // while (targetMenus.length > 0) {
    //   const menu = targetMenus.pop();
    //   this.showMenu(event, menu, menu.name);
    // }
  };

  showMenu = (e, menu, menuKey) => {
    const targetPos = e.target.getBoundingClientRect();
    const newX = menu.parentKey ? targetPos.width + targetPos.x - 2 : e.clientX;
    const newY = menu.parentKey ? targetPos.y : e.clientY;
    const newMenu = { ...menu, x: newX, y: newY, visible: true };
    this.updateMenu(menuKey, newMenu);
  }

  hideMenu = (menu, menuKey) => {
    const newMenu = ({ ...menu, visible: false });
    this.updateMenu(menuKey, newMenu);
  }

  updateMenu = (menuKey, newMenu) => {
    this.setState(state => ({
      ...state,
      menus: {
        ...state.menus,
        [menuKey]: newMenu
      }
    }));
  }

  toggleMenu = (e, menuName) => {
    this.closeMenus();
    const { menus } = this.state;
    const menuKey = menuName || e.target.value.replace(/__(.*)__/, '$1');
    const menu = menus[menuKey];
    if (menu.visible) {
      this.hideMenu(menu, menuKey);
    } else {
      this.showMenu(e, menu, menuKey);
    }
  }

  moveToolbar = (x, y) => {
    this.setState((prevState) => ({
      position: {
        ...prevState.position,
        controlled: { x, y },
        delta: { x, y }
      }
    }));
  }

  snapLeft = () => {
    const { position: { delta } } = this.state;
    if (delta.x < 10) {
      this.setState((prevState) => ({
        position: {
          ...prevState.position,
          mini: true
        }
      }));
    } else {
      const newPos = { x: 0, y: delta.y };
      this.moveToolbar(newPos.x, newPos.y);
    }
  }

  expandOut= () => {
    this.setState(prevState => ({
      position: {
        ...prevState,
        mini: false
      }
    }));
  }

  handleDrag = (e, ui) => {
    const { position: { x, y } } = this.state;
    this.setState(prevState => ({
      position: {
        ...prevState,
        delta: {
          x: x + ui.deltaX,
          y: y + ui.deltaY
        }
      }
    }));
  }

  onDragStart = () => {
    this.setState(prevState => ({
      position :  {
        ...prevState,
        controlled: false,
        activeDrags: prevState.position.activeDrags + 1
      }
    }));
  }

  onDragStop = () => {
    this.setState(prevState => ({
      position :  {
        ...prevState.position,
        activeDrags: prevState.position.activeDrags - 1
      }
    }));
  }

  closeMenus = (excluded) => {
    const { menus } = this.state;
    const newMenus = {};
    _.keys(menus)
      .filter(menu => [].concat(excluded).indexOf(menu === -1))
      .forEach(menuName => {
        newMenus[menuName] = { ...menus[menuName], visible: false };
      });

    this.setState({
      menus: { ...newMenus }
    }, this._stateUpdated.bind(this));
  }


  handleExecuteActionSet = (actionSets, actionName) => {
    const { executeActionSet } = this.props;
    const actionSet = actionSets[actionName];
    this.setState({
      statusTitle: actionSet.name,
      statusText: `${actionSet.actions.length} Actions`
    });
    this.closeMenus();
    this.executeActionSet(actionSet);
  }

  executeActionSet = ({ name, actions }) => {
    const { startActionSet, endActionSet, doAction } = this.props;
    startActionSet({ name, actions });

    const defaultInterval = 500;
    let i = 0;

    const runAction = () => {
      const curr = actions[i];
      this.setState({
        statusText: `${curr.type} (${i + 1}/${actions.length})`,
        progress: `${((i + 1) / actions.length) * 100}`
      });
      doAction(actions[i]);
      i++;
    };

    const runSpacedActions = () => {
      runAction();
      if (i < actions.length) {
        const interval = actions[i]._interval || defaultInterval;
        setTimeout(runSpacedActions, interval);
      } else {
        this.setState({
          statusText: `Finished ${actions.length} actions`,
          progress: 100
        });
        endActionSet({ name });
      }
    };
    runSpacedActions();
  };

  menuIcon(type) {
    const { classes } = this.props;
    if (type === 'submenu') {
      return (<MdChevronRight className={classes.menuIconSubmenu} />);
    } else if (type === 'on') {
      return (<MdCheckBox className={classes.menuIconOn} />);
    } else if (type === 'off') {
      return (<MdCheckBoxOutlineBlank className={classes.menuIconOff} />);
    } else if (type === 'check') {
      return (<MdCheck className={classes.menuIconCheck} />);
    } else if (type === 'levelOn') {
      return (<MdFiberManualRecord className={classes.menuIconLevelOn} />);
    } else if (type === 'levelOff') {
      return (<MdFiberManualRecord className={classes.menuIconLevelOff} />);
    }
    return false;
  }


  render() {
    const theme = this.getTheme();
    const {
      stateStats,
      clientStats,
      persistState,
      commonSets,
      viewSets,
      currentView,
      classes,
      appConfig: { appVersion, apiVersion },
    } = this.props;

    const getButtonClass = (hasSets) => {
      const myClass = {
        wrapper: `${hasSets ? classes.wrapperActivated : ''} ${classes.buttonWrapper}`,
        button: `${hasSets ? classes.buttonActivated : ''} ${classes.button}`
      };
      return myClass;
    };

    const { menus, position, progress, statusTitle, statusText, statusType } = this.state;
    return (
      <Fragment>
        {_.keys(menus).map(menuKey => (
          <ContextMenu
            key={menuKey}
            visible={menus[menuKey].visible}
            x={menus[menuKey].x}
            y={menus[menuKey].y}
            wrapperProps={{
              onMouseLeave: this.hoverOutMenu,
              'data-menukey': menuKey
            }}
            buttonProps={{
              onMouseEnter: this.hoverInMenuItem,
              onMouseLeave: this.hoverOutMenuItem,
              onClick: this.handleClick,
              style: { width: '105%' }
            }}
            theme={theme}
            items={menus[menuKey].items}
          />
        ))}
        <Draggable
          position={position.controlled || position.delta}
          grid={[5, 5]}
          onStart={() => this.onDragStart()}
          onStop={() => this.onDragStop()}
          onDrag={(e, ui) => this.handleDrag(e, ui)}>
          <div className={`${position.mini ? classes.miniContainer : ''} ${classes.container}`}>
            <div className={classes.elements} ref={this.getRef}>
              <div className={classes.header}>
                <div className={`${position.mini ? classes.headerMini : ''} ${classes.headerContainer}`}>
                  <div className={classes.headerRow}>
                    <span className={classes.label}>Client</span>
                    <span className={classes.value}>{`v${appVersion}`}</span>
                  </div>
                  <div className={classes.headerRow}>
                    <span className={classes.label}>API</span>
                    <span className={classes.value}>{`v${apiVersion}`}</span>
                  </div>
                </div>

                <div className={classes.visibilityWrapper}>
                  <Button
                    wrapperClass={classes.exitButtonWrapper}
                    buttonClass={classes.exitButton}
                    theme={theme}>
                    {'X'}
                  </Button>
                  <Button
                    theme={theme}
                    wrapperClass={classes.expandButtonWrapper}
                    className={classes.expandButton}
                    onClick={() => (position.mini ? this.expandOut() : this.snapLeft())}>
                    {`${position.mini ? '>>' : '<<'}`}
                  </Button>
                </div>
              </div>

              <Divider />

              <table className={`${position.mini ? classes.headerMini : ''} ${classes.infoContainer}`}>
                <tbody>
                  <tr className={classes.infoRow}>
                    <td className={classes.infoVal}>{`${stateStats.size}`}</td>
                    <td className={classes.infoVal}>{`${stateStats.keys}`}</td>
                    <td className={classes.infoVal}>{`${stateStats.primitives}`}</td>
                  </tr>
                  <tr className={classes.infoRow}>
                    <td className={classes.infoLabel}>State</td>
                    <td className={classes.infoLabel}>Keys</td>
                    <td className={classes.infoLabel}>Primitives</td>
                  </tr>
                </tbody>
              </table>

              <Divider />

              <table className={`${position.mini ? classes.headerMini : ''} ${classes.infoContainer}`}>
                <tbody>
                  <tr className={classes.infoRow}>
                    <td className={classes.infoVal}>{`${clientStats.memory.used}`}</td>
                    <td className={classes.infoVal}>{`${clientStats.dom.maxDepth}`}</td>
                    <td className={classes.infoVal}>{`${clientStats.dom.totalNodes}`}</td>
                  </tr>
                  <tr className={classes.infoRow}>
                    <td className={classes.infoLabel}>Heap</td>
                    <td className={classes.infoLabel}>Depth</td>
                    <td className={classes.infoLabel}>Nodes</td>
                  </tr>
                </tbody>
              </table>

              <Divider />

              <Button
                buttonClass={getButtonClass(commonSets).button}
                wrapperClass={getButtonClass(commonSets).wrapper}
                onClick={(e) => this.toggleMenu(e, 'commonSets')}
                disabled={!commonSets || commonSets.length === 0}
                theme={theme}>
                {`${position.mini ? 'GA' : 'Global Actions'}`}
              </Button>
              <Divider />
              <Button
                buttonClass={getButtonClass(viewSets).button}
                wrapperClass={getButtonClass(viewSets).wrapper}
                disabled={!viewSets || viewSets.length === 0}
                onClick={(e) => this.toggleMenu(e, 'viewSets')}
                theme={theme}>
                {`${position.mini ? 'VA' : `${currentView} Actions`}`}
              </Button>
              <Divider />
              <Button
                wrapperClass={classes.buttonWrapper}
                onClick={(e) => this.toggleMenu(e, 'logger')}
                theme={theme}>
                {`${position.mini ? 'LG' : 'Logger'}`}
              </Button>
              <Divider />
              <Button
                buttonClass={getButtonClass(false).button}
                wrapperClass={getButtonClass(false).wrapper}
                onClick={(e) => this.toggleMenu(e, 'persistedState')}
                theme={theme}>
                {`${position.mini ? 'PS' : 'Persist State'}`}
              </Button>
              <Divider />
              <Button
                buttonClass={getButtonClass(false).button}
                wrapperClass={getButtonClass(false).wrapper}
                disabled
                onClick={(e) => this.toggleMenu(e, 'inspector')}
                theme={theme}>
                {`${position.mini ? 'RI' : 'Redux Inspector'}`}
              </Button>
            </div>
            {(progress > 0 || statusTitle || statusText) && (
              <Notification
                theme={theme}
                type={statusType}>
                <div className={classes.statusTitle}>{statusTitle}</div>
                <div className={classes.statusText}>{statusText}</div>
                <div className={classes.progressWrapper} hidden={progress === 0}>
                  <LinearProgress
                    classes={{ dashed: classes.dashed }}
                    variant='buffer'
                    value={parseInt(progress, 10)}
                    valueBuffer={parseInt(progress, 10)}
                  />
                  <LinearProgress
                    classes={{ dashed: classes.dashed }}
                    color='secondary'
                    variant='buffer'
                    value={parseInt(progress, 10)}
                    valueBuffer={parseInt(progress, 10)}
                  />
                </div>
              </Notification>
            )}
          </div>
        </Draggable>
      </Fragment>
    );
  }
}

const propTypes = {
};

Toolbar.propTypes = propTypes;

const pollStateStats = (state) => {
  setTimeout(pollStateStats.bind(undefined, state), 10000);
  return getStateStats(state);
};

const pollClientStats = () => {
  setTimeout(pollClientStats, 10000);
  return getClientStats();
};

const stateProps = (state) => ({
  appConfig      : _.get(state, 'config.app'),
  devConfig      : _.get(state, 'config.dev'),
  persistedState : hudPersistStateSelector(state),
  commonSets     : commonActionSetsSelector(state),
  viewSets       : viewActionSetsSelector(state),
  currentView    : _.get(state, 'ui.currentView'),
  stateStats     : pollStateStats(state),
  clientStats    : pollClientStats()
});

const actionCreators = {
  persistState:     devPersistState,
  startActionSet:   devStartActionSet,
  doAction:         devDoAction,
  endActionSet:     devEndActionSet,
  updateSetting:    devUpdateSetting
};
export default connect(stateProps, actionCreators)(withStyles(styles)(Toolbar));
