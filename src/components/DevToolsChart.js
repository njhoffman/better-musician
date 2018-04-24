import * as Themes from 'redux-devtools-themes';
import React from 'react';
import { createDevTools } from 'redux-devtools';
import ChartMonitor from 'redux-devtools-chart-monitor';

const theme = Themes.monokai;

theme.base07 = '#000000';

export const DevToolsChart = createDevTools(<ChartMonitor theme={Themes.monokai} style={{ link: { stroke: "#226688" }  }}  />);
// export const DevToolsChart = <ChartMonitor theme={Themes.monokai} style={{ link: { stroke: "#226688" }  }}  />;

// export default (store) => <DevToolsChart store={store} />;
export default (store) => createDevTools(<ChartMonitor store={store} theme={Themes.monokai} style={{ link: { stroke: "#226688" }  }}  />);
