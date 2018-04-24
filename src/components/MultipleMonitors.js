import React, { Component, cloneElement } from 'react';

const childrenMonitorState = (props, state, action) => {
  return props.children.map(child => child.type.update(child.props, state, action));
}

const reducer = (props, state = {}, action) => {
  return {
    childrenMonitorState: childrenMonitorState(props, state.childMonitorState, action)
  };
}

const baseStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#1d1d1d'
};

const rowStyles = [{
  width: '100%',
  flexDirection: 'row',
  display: 'flex',
  height: '60px',
  alignItems: 'center'
}, {
  width: '100%',
  flexDirection: 'row',
  display: 'flex',
  height: 'calc(100% - 60px)',
}];

const cellStyle = {
  width: '100%'
};

const monitorStyles = [{
  width: '235px'
}, {
  width: 'calc(100% - 235px)'
}, {
  width: '100%',
}];

export default class MultipleMonitors extends Component {
  static update = reducer;

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { monitorState, children, style = baseStyle, ...rest } = this.props;

    // if (this.props.theme && !style.backgroundColor) {
    //   baseStyle.backgroundColor = this.props.theme.base00
    // }
    const monitors = [];
    children.forEach(c => c.props.inline && _.isArray(_.last(monitors))
      ? _.last(monitors).push(c)
      : monitors.push([c])
    );

    let n = -1;
    const monitorsRendered = monitors.map((row, i) =>
      <div className={"row-" + i} key={'row-' + i} style={{ ...rowStyles[i] }}>
        {row.map((child, j) => {
          n++;
          return (
            <div
              className={"monitor-" + n}
              key={'cell-' + j}
              style={{ ...cellStyle, ...monitorStyles[n] }}>
              {cloneElement(child, {
                ...rest,
                monitorState: monitorState.childrenMonitorState[n],
                key: "monitor-" + n
              })}
            </div>
          )}
        )}
      </div>
    );

    return (
      <div style={style}>
        {monitorsRendered}
      </div>
    );
  }
}
