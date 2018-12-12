import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Divider, withStyles } from '@material-ui/core';
import * as themes from 'redux-devtools-themes';

import { commonActionSetsSelector, viewActionSetsSelector } from 'selectors/dev';
import { init as initLog } from 'shared/logger';
import Button from './Button';

const { info, warn } = initLog('custom-launcher');

const styles = (theme) => ({
  container: {
    left: 0,
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    fontSize: '0.8em',
    overflowY: 'hidden',
    direction: 'ltr',
    color: 'white',
    padding: '5px',
    backgroundColor: '#000',
    opacity: 0.9,
    top: '100px',
    position: 'absolute',
    minWidth: '150px',
    maxWidth: '200px',
    zIndex: 9999
  },
  elements: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    overflowX: 'hidden',
    overflowY: 'auto',
    verticalAlign: 'middle',
    alignItems: 'center',
    marginTop: '15px'
  },
  buttonActive: {
    backgroundColor: '#838184',
    color: '#0e0e0e'
  },
  buttonWrapper: {
    display: 'block',
    margin: '5px',
    width: '100%'
  },
  wrapperEnabled: {},
  button: { },
  buttonEnabled: {
    color: 'white',
    background: '#229966'
  }
});

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

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    const { devConfig } = props;
    this.getRef = this.getRef.bind(this);
    this.state = {
      showChart : devConfig && devConfig.showChart
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

  render() {
    const theme = this.getTheme();
    const {
      viewSets,
      commonSets,
      appConfig: { appVersion },
      classes: { container, buttonWrapper, wrapperEnabled, button, buttonEnabled, elements }
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

    const getClass = (hasSets) => ({
      wrapper: `${hasSets ? wrapperEnabled : ''} ${buttonWrapper}`,
      button: `${hasSets ? buttonEnabled : ''} ${button}`
    });
    return (
      <div className={container}>
        <div className={elements} ref={this.getRef}>
          <div>{`v${appVersion}`}</div>
          <Divider />
          <Button
            buttonClass={getClass(commonSets).button}
            wrapperClass={getClass(commonSets).wrapper}
            theme={theme}>
           Global Action Sets
          </Button>
          <Divider />
          <Button
            buttonClass={getClass(viewSets).button}
            wrapperClass={getClass(viewSets).wrapper}
            theme={theme}>
           LoginView Action Sets
          </Button>
          <Divider />
          <Button wrapperClass={buttonWrapper} theme={theme}>
            Logger
          </Button>
        </div>
      </div>
    );
  }
}

const stateProps = (state) => ({
  appConfig  : _.get(state, 'config.app'),
  commonSets : commonActionSetsSelector(state),
  viewSets   : viewActionSetsSelector(state),

});
export default connect(stateProps)(withStyles(styles)(Toolbar));
