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
  MdChevronRight
} from 'react-icons/md';

import { devPersistState, devStartActionSet, devEndActionSet, devDoAction } from 'actions/dev';
import {
  hudPersistStateSelector,
  currentViewSelector,
  commonActionSetsSelector,
  viewActionSetsSelector,
} from 'selectors/dev';
import { init as initLog } from 'shared/logger';
import Button from './Button';
import ContextMenu from './ContextMenu';
import Notification from './Notification';
import styles from './styles';

const { info, warn } = initLog('custom-launcher');

class Toolbar extends Component {
  static defaultProps = {
    devConfig: {
      showChart: false
    },
    commonSets: null,
    viewSets: null
  };

  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    appConfig: PropTypes.instanceOf(Object).isRequired,
    devConfig: PropTypes.instanceOf(Object),
    commonSets: PropTypes.instanceOf(Object),
    viewSets: PropTypes.instanceOf(Object),
    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  };

  static defaultProps = {
    theme: 'twilight'
  };

  defaultPosition = {
    activeDrags: 0,
    delta: {
      x: 0, y: 0
    },
    controlled: {
      x: -400, y: 200
    }
  };

  assignKeys(items) {
    const { parentKey } = this.state;
    return items.map((item, idx) => ({
      ...item,
      key: `${parentKey}-${idx}`,
      value: item.value || item.name
    }));
  }

  menuItems = {
    logger: [{
      name: 'Colors',
      value: true,
    }, {
      name: 'Actions',
      value: true,
    }, {
      name: 'Requests',
      value: true,

    }, {
      name: 'Levels',
      sublinks: [{
        name: 'Fatal',
        value: 1
      }, {
        name: 'Error',
        value: 2
      }, {
        name: 'Warn',
        value: 3
      }, {
        name: 'Info',
        value: 4
      }, {
        name: 'Debug',
        value: 5
      }, {
        name: 'Trace',
        value: 6
      }]
    }]
  };

  getMenuIcon = (menu) => {
    if (menu.sublinks) {
      return (<MdChevronRight style={{ position: 'absolute', right: '5px' }}/>);
    } else if (menu.value === true) {
      return (<MdCheck style={{ color: 'green', position: 'absolute', right: '5px' }}/>)
    }
  }

  generateMenu = (menu, menuKey, parentKey) => ({
    visible: false,
    hovering: false,
    x: 0,
    y: 0,
    parentKey,
    items: _.keys(menu).map((key, idx) => {
      const { name, sublinks, value } = menu[key];
      return  {
        name,
        parentKey: menuKey,
        value : value || key,
        icon:  this.getMenuIcon(menu[key]),
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
        }, menuItems, menuKey)
      );
    });
    return menuItems;
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    const { devConfig } = props;
    this.getRef = this.getRef.bind(this);
    this.state = {
      showChart : devConfig && devConfig.showChart,
      progress: 0,
      statusTitle: '',
      statusText: '',
      statusType: 'info',
      position: this.defaultPosition
    };
  }

  getTheme() {
    const { theme } = this.props;
    if (typeof theme !== 'string') {
      return theme;
    }

    if (typeof themes[theme] !== 'undefined') {
      return themes[theme];
    }

    warn(`DevTools theme ${theme} not found, defaulting to nicinabox`);
    return themes.nicinabox;
  }

  getRef(node) {
    this.node = node;
  }

  toggleChart() {
    this.setState(state => ({
      ...state,
      showChart: !state.showChart
    }));
  }

  popupUnload() {
    info('popup unloading...');
    this.setState(state => ({
      ...state,
      showChart: false
    }));
  }

  handleLoggerClick = (e) => {
    console.info('handleLoggerClick', e);
  }

  handleClick = (e, parentKey) => {
    const { menus } = this.state;
    const pKey = parentKey || _.get(e, 'target.attributes.data-parentkey.value');
    const pMenu = menus[pKey];
    if (!pMenu.onClick) {
      this.handleClick(e, pMenu.parentKey);
    } else {
      pMenu.onClick(e);
    }
  }

  hoverInMenuItem = (e) => {
    const { menus } = this.state;
    const { classes } = this.props;
    const { parentkey: parentKey, key } = e.currentTarget.dataset;
    const parentMenu = menus[parentKey];
    const menuItem = _.find(parentMenu.items, { key });
    parentMenu.hovering = key;
    menuItem.className = classes.menuHover;
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
    const { parentkey: parentKey, key } = e.currentTarget.dataset;
    const { parentkey: newParentKey } = e.relatedTarget.dataset;
    const parentMenu = menus[parentKey];
    const menuItemOut = _.find(parentMenu.items, { key });
    menuItemOut.hovering = false;
    menuItemOut.className = '';
    // TODO: hide all submenus not belonging to menuItem
    if (menuItemOut.subMenu) {
      const subMenu = menus[menuItemOut.subMenu];
      if (newParentKey !== menuItemOut.subMenu) {
        subMenu.hovering = false;
        this.hideMenu(e, subMenu, menuItemOut.subMenu);
      } else {
        menuItemOut.className = classes.sublinkOpen;
        this.updateMenu(parentKey, parentMenu);
      }
    }
  }

  hoverOutMenu = (e, parentMenu) => {
    const { menus } = this.state;
    // console.info('hoverOutMenu', parentMenu, menus);
    const newTarget = _.get(e, 'relatedTarget.attributes.data-parentkey.value');
    if (!newTarget) {
      window.setTimeout(() => {
        // console.info('closing all menus', menus);
        // this.closeMenus();
      }, 2000);
    }
  }

  showMenu = (e, menu, menuKey) => {
    const targetPos = e.target.getBoundingClientRect();
    const newX = menu.parentKey ? targetPos.width + targetPos.x - 2 : e.clientX;
    const newY = menu.parentKey ? targetPos.y : e.clientY;
    const newMenu = { ...menu, x: newX, y: newY, visible: true };
    this.updateMenu(menuKey, newMenu);
  }

  hideMenu = (e, menu, menuKey) => {
    const newMenu = ({ ...menu, visible: false })
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
    const { menus } = this.state;
    const menuKey = menuName || e.target.value.replace(/__(.*)__/, '$1');
    const menu = menus[menuKey];
    if (menu.visible) {
      this.hideMenu(e, menu, menuKey)
    } else {
      this.showMenu(e, menu, menuKey);
    }
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.position.delta;
    this.setState({
      position: {
        ...this.state.position,
        delta: {
          x: x + ui.deltaX,
          y: y + ui.deltaY
        }
      }
    });
  }

  onDragStart = () => {
    this.setState({
      position :  {
        ...this.state.position,
        activeDrags: this.state.position.activeDrags + 1
      }
    });
  }

  onDragStop = () => {
    this.setState({
      position :  {
        ...this.state.position,
        activeDrags: this.state.position.activeDrags - 1
      }
    });
  }

  closeMenus = (excluded) => {
    const { menus } = this.state;
    const newMenus = {}
    _.keys(menus)
      .filter(menu => [].concat(excluded).indexOf(menu === -1))
      .forEach(menuName => {
        newMenus[menuName] = { ...menus[menuName], visible: false }
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

  executeActionSet = ({ name, actions }) =>  {
    const { startActionSet, endActionSet, doAction } = this.props;
    startActionSet({ name, actions });

    const defaultInterval = 500;
    let i = 0;

    const runAction = () => {
      const curr = actions[i];
      this.setState({
        statusText: `${curr.type} (${i + 1}/${actions.length})`,
        progress: `${((i + 1)/ actions.length) * 100}`
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
    }
    runSpacedActions();
  };


  _stateUpdated() {
    // console.log(this.state);
  }

  componentDidUpdate(nextProps) {
    const { viewSets, commonSets, persistedState } = nextProps;
    if (!this.state.menus && commonSets) {
      _.merge(this.menuItems, { commonSets, viewSets, persistedState });
      const generatedMenus = this.generateMenus(this.menuItems);
      generatedMenus.logger.onClick = this.handleLoggerClick;
      generatedMenus.viewSets.onClick = (e) => this.handleExecuteActionSet(viewSets, e.target.value);
      generatedMenus.commonSets.onClick = (e) => this.handleExecuteActionSet(commonSets, e.target.value);
      this.setState({
        menus: generatedMenus
      });
    }
  }

  render() {
    const theme = this.getTheme();
    const {
      persistState,
      commonSets,
      viewSets,
      currentView,
      classes,
      appConfig: { appVersion, apiVersion },
    } = this.props;


    const { showChart } = this.state;

    if (showChart) {
      // const winOptions =  {
      //   menubar: 'no', location: 'no', resizable:  'yes', scrollbars: 'no', statusbar: 'no', toolbar: 'no',
      //   width: 1000, height: 1200, left: 3500, top: 50, margin: 0
      // };
      //
      warn('Trying to show chart but it is disabled');
    }

    // const menuItems = this.generateMenus(_.merge(this.menuItems, { persistedState, commonSets, viewSets }));

    const getButtonClass = (hasSets) => {
      const myClass = {
        wrapper: `${hasSets ? classes.wrapperActivated : ''} ${classes.buttonWrapper}`,
        button: `${hasSets ? classes.buttonActivated : ''} ${classes.button}`
      }
      return myClass;
    };

    const { menus } = this.state;
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
              onClick: this.handleClick
            }}
            theme={theme}
            items={menus[menuKey].items}
          />
        ))}
        <Draggable
          onStart={() => this.onDragStart()}
          onStop={() => this.onDragStop()}
          onDrag={(e, ui) => this.handleDrag(e, ui)}>
          <div className={classes.container}>
            <div className={classes.elements} ref={this.getRef}>
              <div className={classes.header}>
                <div className={classes.headerContainer}>
                  <div className={classes.headerRow}>
                    <span className={classes.label}>Client</span>
                    <span className={classes.value}>{`v${appVersion}`}</span>
                  </div>
                  <div className={classes.headerRow}>
                    <span className={classes.label}>API</span>
                    <span className={classes.value}>{`v${apiVersion}`}</span>
                  </div>
                </div>
                <div className={classes.expandButtonWrapper}>
                  <Button theme={theme}>
                    {`<<`}
                  </Button>
                </div>
              </div>
              <Divider />
              <Button
                buttonClass={getButtonClass(commonSets).button}
                wrapperClass={getButtonClass(commonSets).wrapper}
                onClick={(e) => this.toggleMenu(e, 'commonSets')}
                theme={theme}>
                Global Actions
              </Button>
              <Divider />
              <Button
                buttonClass={getButtonClass(viewSets).button}
                wrapperClass={getButtonClass(viewSets).wrapper}
                onClick={(e) => this.toggleMenu(e, 'viewSets')}
                theme={theme}>
                {currentView} Actions
              </Button>
              <Divider />
              <Button
                wrapperClass={classes.buttonWrapper}
                onClick={(e) => this.toggleMenu(e, 'logger')}
                theme={theme}>
                Logger
              </Button>
              <Divider />
              <Button
                buttonClass={getButtonClass(false).button}
                wrapperClass={getButtonClass(false).wrapper}
                onClick={(e) => this.toggleMenu(e, 'persistedState')}
                theme={theme}>
                Persist State
              </Button>
            </div>
            {(this.state.progress > 0 || this.state.statusTitle || this.state.statusText) && (
              <Notification
                theme={theme}
                type={this.state.statusType}>
                <div className={classes.statusTitle}>{this.state.statusTitle}</div>
                <div className={classes.statusText}>{this.state.statusText}</div>
                <div className={classes.progressWrapper} hidden={this.state.progress === 0}>
                  <LinearProgress
                    classes={{ dashed: classes.dashed }}
                    variant="buffer"
                    value={parseInt(this.state.progress)}
                    valueBuffer={parseInt(this.state.progress)} />
                  <LinearProgress
                    classes={{ dashed: classes.dashed }}
                    color="secondary"
                    variant="buffer"
                    value={parseInt(this.state.progress)}
                    valueBuffer={parseInt(this.state.progress)} />
                </div>
              </Notification>
            )}
          </div>
        </Draggable>
      </Fragment>
    );
  }
}

const stateProps = (state) => ({
  appConfig      : _.get(state, 'config.app'),
  persistedState : hudPersistStateSelector(state),
  commonSets     : commonActionSetsSelector(state),
  viewSets       : viewActionSetsSelector(state),
  currentView    : _.get(state, 'ui.currentView')

});

const actionCreators = {
  persistState:     devPersistState,
  startActionSet:   devStartActionSet,
  doAction:         devDoAction,
  endActionSet:     devEndActionSet,
}
export default connect(stateProps, actionCreators)(withStyles(styles)(Toolbar));
