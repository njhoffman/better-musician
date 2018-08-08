import React from 'react';
import NewWindow from 'components/NewWindow';
import DevToolsChart  from 'components/DevTools/DevToolsChart';
import { init as initLog } from 'shared/logger';
const { info } = initLog('showChart');

const ChartWindow = (store, props) => {
  info('opening chart', Object.keys(store), Object.keys(props));
  return (
    <NewWindow>
      <DevToolsChart {...props} store={store} />
    </NewWindow>
  );
};

export default ChartWindow;
