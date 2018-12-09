import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as themes from 'redux-devtools-themes';
import Button from './Button';
import { Divider, withStyles } from '@material-ui/core';


import { init as initLog } from 'shared/logger';

const { info, warn } = initLog('custom-launcher');

const styles = (theme) => ({
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    fontSize: '0.8em',
    position: 'relative',
    overflowY: 'hidden',
    direction: 'ltr',
    color: 'white',
    padding: '5px',
    backgroundColor: '#000',
    opacity: 0.7,
    top: '100px',
    position: 'absolute',
    width: '100px',
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
    width: '100%',
    margin: '5px'
  }
});

class Toolbar extends Component {
  static defaultProps = {
    devConfig: {
      showChart: false
    }
  };

  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    devConfig: PropTypes.instanceOf(Object),
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
    const { appConfig, classes: { container, buttonWrapper, elements } } = this.props;

    const winOptions =  {
      menubar:    'no',
      location:   'no',
      resizable:  'yes',
      scrollbars: 'no',
      statusbar:  'no',
      toolbar:    'no',
      width:      1000,
      height:     1200,
      left:       3500,
      top:        50,
      margin:     0
    };

    return (
      <div className={container}>
        <div className={elements} ref={this.getRef}>
          <div>v{appConfig.appVersion}</div>
          <Divider />
          <Button wrapperClass={buttonWrapper} theme={theme}>
            Actions
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
  appConfig: _.get(state, 'config.app')
});
export default connect(stateProps)(withStyles(styles)(Toolbar));
