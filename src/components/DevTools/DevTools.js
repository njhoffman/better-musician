import React from 'react';

import { createDevTools } from 'redux-devtools';
import CustomLauncher from 'components/DevTools/CustomLauncher';
import Inspector from 'redux-devtools-inspector';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import MultipleMonitors from './MultipleMonitors';

import { twilight } from 'redux-devtools-themes';

const twilightMod = { ...twilight, ...{ base00: '#0e0e0e', base01: '#222527' } };

export const DevTools = (store) =>
  createDevTools(
    <DockMonitor
      defaultIsVisible
      defaultPosition='bottom'
      changeMonitorKey='ctrl-m'
      toggleVisibilityKey='ctrl-shift-h'
      changePositionKey='ctrl-q'>
      <MultipleMonitors className='multi-monitor'>
        <CustomLauncher theme={twilightMod} inline />
        <SliderMonitor theme={twilightMod} inline />
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
