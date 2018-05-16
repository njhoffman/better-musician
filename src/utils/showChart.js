import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import NewWindow from 'components/NewWindow';
import { createDevTools } from 'redux-devtools';
import DevToolsChart  from 'components/DevTools/DevToolsChart';
import { init as initLog } from 'shared/logger';
const { info, warn } = initLog('showChart');

// TODO: fix error caused when closing and reopening

let popup, attachedNode, checkPopupTimer;
const openChart = (store, props) => {
  const winOptions = 'menubar=no,location=no,resizable=yes,scrollbars=no,statusbar=no,toolbar=no';
  const size = 'width=1200,height=1800';
  const position = 'left=4000,top=50,margin=0';

  // if (popup && !popup.closed) {
  //   popup.location.reload();
  // }

  info(`opening dev chart popup: ${winOptions},${size},${position}`);
  popup = window.open('', 'DevTools_Chart', `${winOptions},${size},${position}`);


  window.onunload = () => {
    info('parent window unloading, removing popup');
    popup.unload();
  };

  setTimeout(() => {
    const DevToolsChart  = require('components/DevTools/DevToolsChart').default;
    popup.document.write('<div id="react-devtools-root"></div>');
    attachedNode = popup.document.getElementById('react-devtools-root');
    render(
      <DevToolsChart {...props} store={store} />,
      attachedNode
    );

    // TODO: find a better solution for this
    let styledComponent;
    const allStyles = document.head.getElementsByTagName('style');
    Object.keys(allStyles).some(key => {
      if (allStyles[key].getAttribute('data-styled-components-is-local')) {
        styledComponent = allStyles[key].cloneNode(true);
      }
    });

    if (!styledComponent) {
      warn(`can't find styled component for chart`);
    } else {
      // popup.document.head.appendChild(styledComponent);
    }
    popup.document.getElementsByTagName('body')[0].style.margin = '0px';
    popup.document.title = 'DevTools Chart';

    checkPopupTimer = setInterval(function() {
      if (popup.closed) {
        clearInterval(checkPopupTimer);
        checkPopupTimer = null;
        info('popup closed, unmounting component');
        unmountComponentAtNode(attachedNode);
        popup.document.body.remove(attachedNode);
      }
    }, 1000);
  }, 20);

};

export default (store, props) => {
  // openChart(store, props);
  // return (
  //   <div>HEY</div>
  // );
  info('opening chart', Object.keys(store), Object.keys(props));
  return (
    <NewWindow>
      <DevToolsChart {...props} store={store} />
    </NewWindow>
  );
};
