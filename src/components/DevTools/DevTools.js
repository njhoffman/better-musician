import React from 'react';

import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { twilight } from 'redux-devtools-themes';

import MultipleMonitors from './MultipleMonitors';
import Launcher from './Launcher';
import config from 'config';

const twilightMod = { ...twilight, base00: '#0e0e0e', base01: '#222527' };

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible
    defaultPosition='bottom'
    changeMonitorKey='ctrl-m'
    toggleVisibilityKey='ctrl-shift-h'
    changePositionKey='ctrl-q'>
    <MultipleMonitors className='multi-monitor'>
      <Launcher
        theme={twilightMod}
        devConfig={config.dev}
      />
      <SliderMonitor
        theme={twilightMod}
        preserveScrollTop={false}
        inline
      />
      <Inspector
        theme='twilight'
        expandDiffs
        invertTheme={false}
        supportImmutable
      />
    </MultipleMonitors>
  </DockMonitor>
);

export default DevTools;
