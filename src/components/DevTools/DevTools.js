import React from 'react';

import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import CustomLauncher from 'components/DevTools/CustomLauncher';
import Inspector from 'redux-devtools-inspector';
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import MultipleMonitors from 'components/MultipleMonitors';

import RemoteMonitor from 'remote-redux-devtools';

import css from './DevTools.scss';

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
          expandDiffs={true}
          invertTheme={false}
          supportImmutable
        />
      </MultipleMonitors>
    </DockMonitor>
  );

export default DevTools;
