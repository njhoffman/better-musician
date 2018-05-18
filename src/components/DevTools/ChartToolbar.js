import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'devui/lib/Button';
import * as themes from 'redux-devtools-themes';
// import SliderMonitor from 'redux-slider-monitor';
import SliderMonitor from './SliderMonitor';
import ActionList from './ActionList';
import { createStylingFromTheme } from './createStylingFromTheme';
import { getBase16Theme } from 'react-base16-styling';
import getInspectedState from './getInspectedState';
import { ActionCreators } from 'redux-devtools';
import createDiffPatcher from './createDiffPatcher';
import flatten from 'flat';

const { commit, sweep, toggleAction, jumpToAction, jumpToState } = ActionCreators;

const UPDATE_MONITOR_STATE = '@@redux-devtools-inspector/UPDATE_MONITOR_STATE';
const DEFAULT_STATE = {
  selectedActionId: null,
  startActionId: null,
  inspectedActionPath: [],
  inspectedStatePath: [],
  tabName: 'Diff'
};

export function updateMonitorState(monitorState) {
  return { type: UPDATE_MONITOR_STATE, monitorState };
}

function reduceUpdateState(state, action) {
  return (action.type === UPDATE_MONITOR_STATE) ? {
    ...state,
    ...action.monitorState
  } : state;
}

export function reducer(props, state = DEFAULT_STATE, action) {
  return {
    ...reduceUpdateState(state, action)
  };
}
function getLastActionId(props) {
  return props.stagedActionIds[props.stagedActionIds.length - 1];
}

function getCurrentActionId(props, monitorState) {
  return monitorState.selectedActionId === null
    ? props.stagedActionIds[props.currentStateIndex] : monitorState.selectedActionId;
}

function getFromState(actionIndex, stagedActionIds, computedStates, monitorState) {
  const { startActionId } = monitorState;
  if (startActionId === null) {
    return actionIndex > 0 ? computedStates[actionIndex - 1] : null;
  }
  let fromStateIdx = stagedActionIds.indexOf(startActionId - 1);
  if (fromStateIdx === -1) fromStateIdx = 0;
  return computedStates[fromStateIdx];
}

function createIntermediateState(props, monitorState) {
  const { supportImmutable, computedStates, stagedActionIds,
    actionsById: actions, diffObjectHash, diffPropertyFilter } = props;
  if (!monitorState) {

  }
  const { inspectedStatePath, inspectedActionPath } = monitorState;
  const currentActionId = getCurrentActionId(props, monitorState);
  const currentAction = actions[currentActionId] && actions[currentActionId].action;

  const actionIndex = stagedActionIds.indexOf(currentActionId);
  const fromState = getFromState(actionIndex, stagedActionIds, computedStates, monitorState);
  const toState = computedStates[actionIndex];
  const error = toState ? toState.error : null;

  const fromInspectedState = !error && fromState
    ? getInspectedState(fromState.state, inspectedStatePath, supportImmutable) : null;
  const toInspectedState = !error && toState
    ? getInspectedState(toState.state, inspectedStatePath, supportImmutable) : null;

  const delta = fromInspectedState && toInspectedState
    ? createDiffPatcher(diffObjectHash, diffPropertyFilter).diff(
      fromInspectedState,
      toInspectedState
    ) : null;

  return {
    delta,
    nextState: toState && getInspectedState(toState.state, inspectedStatePath, false),
    action: getInspectedState(currentAction, inspectedActionPath, false),
    error
  };
}

function setupTheme(props) {
  let theme;
  if (typeof props.theme === 'string') {
    if (typeof themes[props.theme] !== 'undefined') {
      theme = themes.nicinabox;
    }
  } else {
    theme = props.theme;
  }

  return theme;
}

function createThemeState(props) {
  const base16Theme = getBase16Theme(props.theme);
  if (props.theme === 'twilight') {
    base16Theme.base00 = '#0e0e0e';
    base16Theme.base01 = '#222527';
  }
  const styling = createStylingFromTheme(props.theme, props.invertTheme);

  return { base16Theme, styling };
}

class ChartToolbar extends Component {
  static propTypes = {
    state: PropTypes.object,
    theme: PropTypes.string,
    computedStates: PropTypes.array,
    actions: PropTypes.object,
    currentStateIndex: PropTypes.number,
    selectedActionId: PropTypes.number,
    diffedStates: PropTypes.array
  };

  static defaultProps = {
    invertTheme: false,
    theme: 'twilight'
  };

  static update = reducer;

  constructor(props) {
    super(props);
    this.state = {
      ...createIntermediateState(props, props.monitorState),
      themeState: createThemeState(props)
    };
  }
  toolbarWrapperStyle() {
    return {
      fontFamily: 'monaco, Consolas, "Lucida Console", monospace',
      position: 'fixed',
      width: '100%',
      bottom: '0px'
    };
  };

  toolbarStyle() {
    return {
      color: 'white',
      margin: 'auto',
      textAlign: 'center',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderTop: 'solid 1px #333',
      background: 'rgba(0, 0, 0, 0.8)',
      width: '50%',
      margin: 'auto',
      position: 'absolute',
      bottom: '0px',
      left: '25%'
    };
  };

  componentWillReceiveProps(nextProps) {
    let nextMonitorState = nextProps.monitorState;
    const monitorState = this.props.monitorState;

    if (
      getCurrentActionId(this.props, monitorState) !==
      getCurrentActionId(nextProps, nextMonitorState) ||
      monitorState.startActionId !== nextMonitorState.startActionId ||
      monitorState.inspectedStatePath !== nextMonitorState.inspectedStatePath ||
      monitorState.inspectedActionPath !== nextMonitorState.inspectedActionPath
    ) {
      this.setState(createIntermediateState(nextProps, nextMonitorState));
    }

    if (this.props.theme !== nextProps.theme ||
        this.props.invertTheme !== nextProps.invertTheme) {
      this.setState({ themeState: createThemeState(nextProps) });
    }
  }

  render() {
    const { stagedActionIds: actionIds, actionsById: actions, computedStates, tabs,
      invertTheme, skippedActionIds, currentStateIndex, monitorState } = this.props;
    const { selectedActionId, startActionId, searchValue, tabName } = monitorState;

    const {
      themeState, action, nextState, delta, error
    } = this.state;

    const flatDelta = delta ? flatten(delta) : {};
    const parsedDelta = {
      fields: {},
      totals: { added: 0, changed: 0, removed: 0 },
      primitives: { added: 0, changed: 0, removed: 0 }
    };

    Object.keys(flatDelta).forEach(fieldKey => {
      const { fields } = parsedDelta;
      const parts = fieldKey.split(/\.(\d+)(?:\.|$)/);
      let [ base, num, val ] = parts;
      num = parseInt(num);
      if (!fields[base]) {
        fields[base] = { num, old: 0, new: 0 };
      }
      fields[base].num = num > fields[base].num ? num : fields[base].num;
      if (num === 0) {
        fields[base].new += 1;
      } else if (num === 1) {
        fields[base].old += 1;
      }
    });

    Object.keys(parsedDelta.fields).forEach(key => {
      const { fields, totals, primitives } = parsedDelta;
      if (fields[key].num === 0) {
        totals.added += 1;
        primitives.added += fields[key].new;
      } else if (fields[key].num === 1) {
        totals.changed += 1;
        primitives.changed += fields[key].new;
      } else if (fields[key].num === 2) {
        totals.removed += 1;
        primitives.removed += fields[key].old;
      }
    });

    const { styling } = themeState;

    const inspectedPathType = tabName === 'Action' ? 'inspectedActionPath' : 'inspectedStatePath';

    const theme = themes.twilight;
    theme.base01 = '#000000';

    return (
      <div style={this.toolbarWrapperStyle()}>
        <div
          key='inspector'
          ref='inspector'
          style={{
            width: '25%',
            borderTop: 'solid 1px #333',
            position: 'absolute',
            bottom: '0px'
          }}
          {...styling(['inspector'])}>
          <ActionList {...{
            actions,
            actionIds,
            searchValue,
            selectedActionId,
            startActionId
          }}
            styling={styling}
            onSearch={this.handleSearch}
            onSelect={this.handleSelectAction}
            onToggleAction={this.handleToggleAction}
            onJumpToState={this.handleJumpToState}
            onCommit={this.handleCommit}
            onSweep={this.handleSweep}
            skippedActionIds={skippedActionIds}
            currentActionId={actionIds[currentStateIndex]}
            lastActionId={getLastActionId(this.props)} />
        </div>
        <div
          className='timeline-controls'
          style={this.toolbarStyle()}>
          <div className='slider'>
            <SliderMonitor {...this.props} theme={theme} parsedDelta={parsedDelta} />
          </div>
        </div>
        <div style={{ width: '25%', position: 'absolute' }} />
      </div>
    );
  }

  updateMonitorState = (monitorState) => {
    this.props.dispatch(updateMonitorState(monitorState));
  }

  handleToggleAction = (actionId) => {
    this.props.dispatch(toggleAction(actionId));
  };

  handleJumpToState = (actionId) => {
    if (jumpToAction) {
      this.props.dispatch(jumpToAction(actionId));
    } else { // Fallback for redux-devtools-instrument < 1.5
      const index = this.props.stagedActionIds.indexOf(actionId);
      if (index !== -1) this.props.dispatch(jumpToState(index));
    }
  };

  handleCommit = () => {
    this.props.dispatch(commit());
  };

  handleSweep = () => {
    this.props.dispatch(sweep());
  };

  handleSearch = (val) => {
    this.updateMonitorState({ searchValue: val });
  };

  handleSelectAction = (e, actionId) => {
    const { monitorState } = this.props;
    let startActionId;
    let selectedActionId;

    if (e.shiftKey && monitorState.selectedActionId !== null) {
      if (monitorState.startActionId !== null) {
        if (actionId >= monitorState.startActionId) {
          startActionId = Math.min(monitorState.startActionId, monitorState.selectedActionId);
          selectedActionId = actionId;
        } else {
          selectedActionId = Math.max(monitorState.startActionId, monitorState.selectedActionId);
          startActionId = actionId;
        }
      } else {
        startActionId = Math.min(actionId, monitorState.selectedActionId);
        selectedActionId = Math.max(actionId, monitorState.selectedActionId);
      }
    } else {
      startActionId = null;
      if (actionId === monitorState.selectedActionId || monitorState.startActionId !== null) {
        selectedActionId = null;
      } else {
        selectedActionId = actionId;
      }
    }

    this.updateMonitorState({ startActionId, selectedActionId, tabName: monitorState.tabName });
  };
}

export default ChartToolbar;
