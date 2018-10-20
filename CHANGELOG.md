Changelog
=========

material-ui causing babel-runtime errors, must:
npm install --save-exact @babel/runtime@7.0.0-beta.55
https://github.com/mui-org/material-ui/issues/12408

```
cp -rv ~/projects/forks/d3-state-visualizer/lib ~/projects/instrumental/node_modules/d3-state-visualizer
cp -rv ~/projects/forks/redux-devtools-chart-monitor/lib ~/projects/instrumental/node_modules/redux-devtools-chart-monitor
cp -rv ~/projects/forks/redux-devtools-inspector/lib ~/projects/instrumental/node_modules/redux-devtools-inspector
```

10-03-2018: 
  2212 errors
  165 modules, 1657 children, 499.82M
  7106 modules, 42.5 MB (68.3s)
    app: 157 4956 dependencies x8
    node: 6946 66900 dependencies x23
  DOM: 10.64/21 - 390
  Home Dev:  194 MB, 907 DOM Nodes, 92 Listeners
  Songs + Module Dev: 156 MB, 1262 DOM, 82 JS ?? 
