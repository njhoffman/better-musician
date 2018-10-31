import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const childrenMonitorState = (props, state, action) => (
  props.children.map(child =>
    child.type.update(child.props, state, action))
);

const reducer = (props, state = {}, action) => ({
  childrenMonitorState: childrenMonitorState(props, state.childMonitorState, action)
});

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
  height: '55px',
  alignItems: 'center'
}, {
  width: '100%',
  flexDirection: 'row',
  display: 'flex',
  height: 'calc(100% - 55px)'
}, {
  display: 'none',
  width: '100%'
}];

const cellStyle = {
  width: '100%'
};

const monitorStyles = [{
  width: '235px',
  height: '100%'
}, {
  height: '100%',
  width: 'calc(100% - 235px)'
}, {
  width: '100%'
}, {
  width: '100%'
}];

class MultipleMonitors extends Component {
  static update = reducer;

  static defaultProps = {
    style: {},
    monitorState: {}
  };

  static propTypes = {
    monitorState:        PropTypes.instanceOf(Object),
    // changeMonitorKey:    PropTypes.string, // 'ctrl-m'
    // changePositionKey:   PropTypes.string.isRequired, // 'ctrl-q'
    // defaultPosition:     PropTypes.string.isRequired, // 'bottom'
    // defaultSize:         PropTypes.number.isRequired, // 0.3,
    // toggleVisibilityKey: PropTypes.string.isRequired, // 'ctrl-shift-h'
    children:            PropTypes.arrayOf(PropTypes.node).isRequired,
    style:               PropTypes.instanceOf(Object)
  };

  render() {
    /* eslint-disable no-unused-vars */
    const { monitorState, children, style = baseStyle, ...props } = this.props;
    /* eslint-enable no-unused-vars */

    const monitors = [];
    children.forEach((c, idx) => (
      c.props.inline && _.isArray(_.last(monitors))
        ? _.last(monitors).push({ ...c, idx })
        : monitors.push([{ ...c, idx }])
    ));

    let n = -1;
    const monitorsRendered = monitors.map((row, i) => (
      <div
        className={`row-${row.idx}`}
        key={`row-${row.idx}`}
        style={{ ...rowStyles[i] }}>
        {row.map((monitor, j) => {
          n += 1;
          return (
            <div
              className={`monitor-${n}`}
              key={`cell-${row.idx}`}
              style={{ ...cellStyle, ...monitorStyles[n] }}>
              {cloneElement(monitor, {
                ...props,
                monitorState: monitorState.childrenMonitorState[n],
                key: `monitor-${row.idx}`
              })}
            </div>
          );
        })}
      </div>
    ));

    return (
      <div style={style}>
        {monitorsRendered}
      </div>
    );
  }
}

export default MultipleMonitors;
