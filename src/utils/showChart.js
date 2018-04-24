import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';

let popup;
const openChart = (ChartDevTool, store) => {
  const winOptions = 'menubar=no,location=no,resizable=yes,scrollbars=no,statusbar=no,toolbar=no';
  const size = 'width=2400,height=1300';
  const position = 'left=50,top=50';

  popup = window.open(null, 'Redux DevTools', `${winOptions},${size},${position}`);
  popup.location.reload();
  if (store.subscribe) {
    popup.document.write('<div id="react-devtools-root""></div>');
    render(
      <Provider store={store}>
        <ChartDevTool />
      </Provider>,
      popup.document.getElementById('react-devtools-root')
    );
  }
};

export default (store) => {
  const { DevToolsChart } = require('components/DevToolsChart');
  console.info('opening chart', store);
  openChart(DevToolsChart, store);
  // Reload in case it already exists
  return (<div>HEY</div>);
  // setTimeout(() => {
  //   popup.document.write('<div id="react-devtools-root""></div>');
  //   render(
  //       <ChartDevTool />
  //     popup.document.getElementById('react-devtools-root')
  //   );
  // }, 10);
};
