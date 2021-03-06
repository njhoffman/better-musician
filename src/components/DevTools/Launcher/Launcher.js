import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as themes from 'redux-devtools-themes';
import Button from 'devui/lib/Button';
import SegmentedControl from 'devui/lib/SegmentedControl';
import { withStyles } from '@material-ui/core';

import NewWindow from 'components/NewWindow';
import DevToolsChart  from 'components/DevTools/Chart';
import { reducer as chartToolbarReducer } from 'components/DevTools/Chart/Toolbar';

import { init as initLog } from 'shared/logger';

const { info, warn } = initLog('custom-launcher');

const styles = (theme) => ({
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    fontSize: '0.8em',
    position: 'relative',
    overflowY: 'hidden',
    height: '100%',
    direction: 'ltr',
    color: 'white'
  },
  elements: {
    display: 'flex',
    justifyContent: 'space-evenly',
    overflowX: 'hidden',
    overflowY: 'auto',
    verticalAlign: 'middle',
    top: 30,
    height: '100%',
    alignItems: 'center'
  },
  buttonActive: {
    backgroundColor: '#838184',
    color: '#0e0e0e'
  }
});

class Launcher extends Component {
  static update = chartToolbarReducer

  static defaultProps = {
    devConfig: {
      showChart: false
    }
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.instanceOf(Object).isRequired,
    devConfig: PropTypes.instanceOf(Object),
    computedStates: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionsById: PropTypes.instanceOf(Object).isRequired,
    stagedActionIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    skippedActionIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    monitorState: PropTypes.shape({
      initialScrollTop: PropTypes.number,
      consecutiveToggleStartId: PropTypes.number
    }).isRequired,
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
    this.toggleChart = this.toggleChart.bind(this);
    this.popupUnload = this.popupUnload.bind(this);
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
    const { classes: { container, elements } } = this.props;
    const { showChart } = this.state;

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
      <div className={container} style={{ backgroundColor: theme.base01 }}>
        <div
          className={elements}
          style={{ backgroundColor: theme.base01 }}
          ref={this.getRef}>
          <Button theme={theme}>Actions</Button>
          <Button theme={theme}>Fixtures</Button>
          <SegmentedControl
            theme={theme}
            values={['Chart']}
            onClick={this.toggleChart}
            selected={showChart ? 'Chart' : ''}
          />
        </div>
        {showChart && (
          <NewWindow
            title='DevTools Chart'
            features={winOptions}
            onUnload={this.popupUnload}>
            <DevToolsChart {...this.props} />
          </NewWindow>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Launcher);
