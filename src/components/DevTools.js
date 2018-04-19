import React from 'react';

import { createDevTools } from 'redux-devtools';
// import LogMonitor from 'redux-devtools-log-monitor';
// import CustomMonitor from 'components/DevTools/Custom';
import Inspector from 'redux-devtools-inspector';
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// import { UsageMonitor } from 'redux-usage-report';
// filterable log monitor, chart monitor, filter actions, dispatch,

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={true}
    defaultPosition="bottom"
    changeMonitorKey="ctrl-m"
    toggleVisibilityKey="ctrl-shift-h"
    changePositionKey="ctrl-q">
    <Inspector theme="twilight" expandDiffs={true} invertTheme={false} />
    {/* <CustomMonitor theme="nicinabox" /> */}
    {/* <UsageMonitor /> */}
    {/* <FilterableLogMonitor theme="nicinabox" /> */}
    {/* <SliderMonitor /> */}
  </DockMonitor>
);

export default DevTools;


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
