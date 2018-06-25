import * as Themes from 'redux-devtools-themes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartMonitor from 'redux-devtools-chart-monitor';
import ChartToolbar from './ChartToolbar';

// import { init as initLog } from 'shared/logger';
// const { info } = initLog('devToolsChart');
//
const theme = Themes.marrakesh;

theme.base07 = '#000000';
// stroke 226688

class DevToolsChart extends Component {
  static propTypes = {
    parentWindow: PropTypes.object
  };

  componentDidMount() {
    this.props.parentWindow.document.addEventListener('keydown', (e) => {
      const container = this.chartMonitor.chartNode.node.children[0].children[0];
      const transform = container.getAttribute('transform').match(/translate\((?:([^)]+)\)scale\(([^)]+))/);
      let newTranslate;
      if (e.key === 'ArrowLeft') {
        newTranslate = (parseInt(transform[1].split(',')[0]) + 10) + ',' + transform[1].split(',')[1];
      } else if (e.key === 'ArrowRight') {
        newTranslate = (parseInt(transform[1].split(',')[0]) - 10) + ',' + transform[1].split(',')[1];
      } else if (e.key === 'ArrowUp') {
        newTranslate = transform[1].split(',')[0] + ',' + (parseInt(transform[1].split(',')[1]) + 10);
      } else if (e.key === 'ArrowDown') {
        newTranslate = transform[1].split(',')[0] + ',' + (parseInt(transform[1].split(',')[1]) - 10);
      }
      if (newTranslate) {
        const newTransform = `translate(${newTranslate})scale(${transform[2]})`;
        // console.info('newTransform', newTransform);
        container.setAttribute('transform', newTransform);
      }
      // 'Control:ArrowRight',
      //   'Control:ArrowLeft',
      //   'Enter',
      //   'ControlEnter',
      //
    });
  }
  render() {
    const chartStyle = {
      link: {
        stroke: '#223344'
      },
      node: {
        opacity: { empty: 0.5 }
      },
      text: {
        colors: { 'default': '#779cc1' },
        opacity: { empty: 0.5 }
      }
    };
    return (
      <div >
        <ChartMonitor
          defaultIsVisible
          size={1000}
          style={chartStyle}
          {...this.props}
          theme={theme}
          ref={(node) => this.chartMonitor = node}
        />
        <ChartToolbar {...this.props} theme='twilight' />
      </div>
    );
  }
}

export default DevToolsChart;

// logger.browser.js?999c:94                              atelierForest
// logger.browser.js?999c:94                              atelierHeath
// logger.browser.js?999c:94                              atelierLakeside
// logger.browser.js?999c:94                              bespin
// logger.browser.js?999c:94                              brewer
// logger.browser.js?999c:94                              bright
// logger.browser.js?999c:94                              chalk
// logger.browser.js?999c:94                              colors
// logger.browser.js?999c:94                              eighties
// logger.browser.js?999c:94                              flat
// logger.browser.js?999c:94                              grayscale
// logger.browser.js?999c:94                              hopscotch
// logger.browser.js?999c:94                              marrakesh
// logger.browser.js?999c:94                              monokai
// logger.browser.js?999c:94                              paraiso
// logger.browser.js?999c:94                              railscasts
// logger.browser.js?999c:94                              tomorrow
