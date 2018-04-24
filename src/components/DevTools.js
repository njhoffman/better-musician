import React from 'react';

import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
// import LogMonitor from 'redux-devtools-log-monitor';
import CustomLauncher from 'components/DevTools/CustomLauncher';
import Inspector from 'redux-devtools-inspector';
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// import { UsageMonitor } from 'redux-usage-report';
// filterable log monitor, chart monitor, filter actions, dispatch,
import MultipleMonitors from 'components/MultipleMonitors';

import  ShowChart from 'utils/showChart';
import RemoteMonitor from 'remote-redux-devtools';

import css from './DevTools.scss';

console.info('css', css);

export const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={true}
    defaultPosition="bottom"
    changeMonitorKey="ctrl-m"
    toggleVisibilityKey="ctrl-shift-h"
    changePositionKey="ctrl-q">
    {/* <RemoteMonitor /> */}
    <MultipleMonitors className="multi-monitor" theme="twilight">
      <CustomLauncher theme="twilight" inline={true}></CustomLauncher>
      <SliderMonitor theme="twilight" inline={true}></SliderMonitor>
      <Inspector
        theme="twilight"
        expandDiffs={true}
        invertTheme={false}
        supportImmutable={true}
        tabs={defaultTabs => [...defaultTabs]}
      />
    </MultipleMonitors>
    {/* <CustomMonitor theme="nicinabox" /> */}
    {/* <UsageMonitor /> */}
    {/* <FilterableLogMonitor theme="nicinabox" /> */}
  </DockMonitor>
);

export default DevTools

// export default (props) => { console.info('hey props', props); return DevTools; }

// inspector: tabs: (defaultTabs) => [...defaultTabs, { name: 'MyTab', component: MyComponent }]
// themes
// nicinabox
// apathy
// ashes
// atelier-dune
// atelier-forest
// atelier-heath
// atelier-lakeside
// atelier-seaside
// bespin
// brewer
// bright
// chalk
// codeschool
// colors
// default
// eighties
// embers
// flat
// google
// grayscale
// greenscreen
// harmonic
// hopscotch
// index
// isotope
// marrakesh
// mocha
// monokai
// ncinabox
// ocean
// paraiso
// pop
// railscasts
// shapeshifter
// solarized
// summerfruit
// threezerotwofour
// tomorrow
// tube
// twilight
