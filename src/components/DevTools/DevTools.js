import React from 'react';

import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { twilight } from 'redux-devtools-themes';
import DevToolsErrorBoundary from 'components/ErrorBoundaries/Main';
import { onError } from 'utils/app';

import MultipleMonitors from './MultipleMonitors';
import Launcher from './Launcher';

const twilightMod = { ...twilight, base00: '#0e0e0e', base01: '#222527' };

export const DevTools = createDevTools(
  <DevToolsErrorBoundary onError={onError}>
    <DockMonitor
      defaultIsVisible
      defaultPosition='bottom'
      changeMonitorKey='ctrl-m'
      toggleVisibilityKey='ctrl-shift-h'
      changePositionKey='ctrl-q'>
      <MultipleMonitors className='multi-monitor'>
        <Launcher theme={twilightMod} />
        <SliderMonitor theme={twilightMod} preserveScrollTop={false} inline />
        <Inspector theme='twilight' expandDiffs invertTheme={false} />
      </MultipleMonitors>
    </DockMonitor>
  </DevToolsErrorBoundary>
);

export default function DevToolsInit(devConfig) {
  return (<DevTools devConfig={devConfig} />);
}
