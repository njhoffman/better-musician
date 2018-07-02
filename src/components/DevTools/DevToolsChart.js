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
          ref={(node) => (this.chartMonitor = node)}
        />
        <ChartToolbar {...this.props} theme='twilight' />
      </div>
    );
  }
}

export default DevToolsChart;
