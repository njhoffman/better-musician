import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as themes from 'redux-devtools-themes';
import { ActionCreators } from 'redux-devtools';
import Slider from 'devui/lib/Slider';
import Button from 'devui/lib/Button';
import SegmentedControl from 'devui/lib/SegmentedControl';

import SliderButton from './SliderButton';

const { reset, jumpToState } = ActionCreators;

export default class SliderMonitor extends (PureComponent || Component) {
  static update = () => {};

  static propTypes = {
    dispatch: PropTypes.func,
    computedStates: PropTypes.array,
    stagedActionIds: PropTypes.array,
    actionsById: PropTypes.object,
    currentStateIndex: PropTypes.number,
    monitorState: PropTypes.shape({
      initialScrollTop: PropTypes.number
    }),
    preserveScrollTop: PropTypes.bool,
    stagedActions: PropTypes.array,
    select: PropTypes.func.isRequired,
    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    keyboardEnabled: PropTypes.bool,
    deltaParsed: PropTypes.object
  };

  static defaultProps = {
    select: state => state,
    theme: 'nicinabox',
    preserveScrollTop: true,
    keyboardEnabled: true,
    parsedDelta: {}
  };

  state = {
    timer: undefined,
    replaySpeed: '1x'
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  }

  setUpTheme = () => {
    let theme;
    if (typeof this.props.theme === 'string') {
      if (typeof themes[this.props.theme] !== 'undefined') {
        theme = themes[this.props.theme];
      } else {
        theme = themes.nicinabox;
      }
    } else {
      theme = this.props.theme;
    }

    return theme;
  }

  handleReset = () => {
    this.pauseReplay();
    this.props.dispatch(reset());
  }

  handleKeyPress = (event) => {
    if (!this.props.keyboardEnabled) {
      return null;
    }
    if (event.ctrlKey && event.keyCode === 74) { // ctrl+j
      event.preventDefault();

      if (this.state.timer) {
        return this.pauseReplay();
      }

      if (this.state.replaySpeed === 'Live') {
        this.startRealtimeReplay();
      } else {
        this.startReplay();
      }
    } else if (event.ctrlKey && event.keyCode === 219) { // ctrl+[
      event.preventDefault();
      this.stepLeft();
    } else if (event.ctrlKey && event.keyCode === 221) { // ctrl+]
      event.preventDefault();
      this.stepRight();
    }
    return null;
  }

  handleSliderChange = (value) => {
    if (this.state.timer) {
      this.pauseReplay();
    }

    this.props.dispatch(jumpToState(value));
  }

  startReplay = () => {
    const { computedStates, currentStateIndex, dispatch } = this.props;

    if (computedStates.length < 2) {
      return;
    }
    const speed = this.state.replaySpeed === '1x' ? 500 : 200;

    let stateIndex;
    if (currentStateIndex === computedStates.length - 1) {
      dispatch(jumpToState(0));
      stateIndex = 0;
    } else if (currentStateIndex === computedStates.length - 2) {
      dispatch(jumpToState(currentStateIndex + 1));
      return;
    } else {
      stateIndex = currentStateIndex + 1;
      dispatch(jumpToState(currentStateIndex + 1));
    }

    let counter = stateIndex;
    const timer = setInterval(() => {
      if (counter + 1 <= computedStates.length - 1) {
        dispatch(jumpToState(counter + 1));
      }
      counter += 1;

      if (counter >= computedStates.length - 1) {
        clearInterval(this.state.timer);
        this.setState({
          timer: undefined
        });
      }
    }, speed);

    this.setState({ timer });
  }

  startRealtimeReplay = () => {
    if (this.props.computedStates.length < 2) {
      return;
    }

    if (this.props.currentStateIndex === this.props.computedStates.length - 1) {
      this.props.dispatch(jumpToState(0));

      this.loop(0);
    } else {
      this.loop(this.props.currentStateIndex);
    }
  }

  loop = (index) => {
    let currentTimestamp = Date.now();
    let timestampDiff = this.getLatestTimestampDiff(index);

    const aLoop = () => {
      const replayDiff = Date.now() - currentTimestamp;
      if (replayDiff >= timestampDiff) {
        this.props.dispatch(jumpToState(this.props.currentStateIndex + 1));

        if (this.props.currentStateIndex >= this.props.computedStates.length - 1) {
          this.pauseReplay();
          return;
        }

        timestampDiff = this.getLatestTimestampDiff(this.props.currentStateIndex);
        currentTimestamp = Date.now();

        this.setState({
          timer: requestAnimationFrame(aLoop)
        });
      } else {
        this.setState({
          timer: requestAnimationFrame(aLoop)
        });
      }
    };

    if (index !== this.props.computedStates.length - 1) {
      this.setState({
        timer: requestAnimationFrame(aLoop)
      });
    }
  }

  getLatestTimestampDiff = index =>
    this.getTimestampOfStateIndex(index + 1) - this.getTimestampOfStateIndex(index)

  getTimestampOfStateIndex = (stateIndex) => {
    const id = this.props.stagedActionIds[stateIndex];
    return this.props.actionsById[id].timestamp;
  }

  pauseReplay = (cb) => {
    if (this.state.timer) {
      cancelAnimationFrame(this.state.timer);
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined
      }, () => {
        if (typeof cb === 'function') {
          cb();
        }
      });
    }
  }

  stepLeft = () => {
    this.pauseReplay();

    if (this.props.currentStateIndex !== 0) {
      this.props.dispatch(jumpToState(this.props.currentStateIndex - 1));
    }
  }

  stepRight = () => {
    this.pauseReplay();

    if (this.props.currentStateIndex !== this.props.computedStates.length - 1) {
      this.props.dispatch(jumpToState(this.props.currentStateIndex + 1));
    }
  }

  changeReplaySpeed = (replaySpeed) => {
    this.setState({ replaySpeed });

    if (this.state.timer) {
      this.pauseReplay(() => {
        if (replaySpeed === 'Live') {
          this.startRealtimeReplay();
        } else {
          this.startReplay();
        }
      });
    }
  }

  render() {
    const {
      currentStateIndex, computedStates, actionsById, stagedActionIds, parsedDelta, stateCount
    } = this.props;
    const { primitives, totals } = parsedDelta;
    const { replaySpeed } = this.state;
    const theme = this.setUpTheme();

    const max = computedStates.length - 1;
    const actionId = stagedActionIds[currentStateIndex];
    let actionType = actionsById[actionId].action.type;
    if (actionType === undefined) actionType = '<UNDEFINED>';
    else if (actionType === null) actionType = '<NULL>';
    else actionType = actionType.toString() || '<EMPTY>';

    const onPlayClick = replaySpeed === 'Live' ? this.startRealtimeReplay : this.startReplay;
    const playPause = this.state.timer
      ? <SliderButton
        theme={theme}
        type='pause'
        onClick={this.pauseReplay} />
      : <SliderButton
        theme={theme}
        iconWidth='2.25rem'
        iconHeight='2.25rem'
        type='play'
        disabled={max <= 0}
        onClick={onPlayClick} />;

    const styles = {
      sliderButton : {
        display: 'inline-block',
        border: 'none'
      },
      sliderContainer: {
        display: 'inline-block',
        width: 'calc(100% - 75px)'
      },
      slider: {
        WebkitAppearance: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        borderTop: 'solid 0.5em transparent',
        borderBottom: 'solid 0.5em transparent',
        padding: '0.5em',
        height: '2.5em',
        borderRadius: '0.8em / 1.1em',
        fontSize: '0.75em',
        cursor: 'pointer',
        // background: 'linear-gradient(#464b50,#0e0e0e) padding-box, 50% 50% border-box',
        background: 'transparent',
        backgroundSize: '100% 100%'
      },
      diffSummary: {
        float: 'left',
        fontSize: '0.8em'
      },
      diffAdded: {
        color: 'green'
      },
      diffRemoved: {
        color: 'red'
      },
      diffChanged: {
        color: 'cyan'
      },
      diffTotal: {
        marginLeft: '5px',
        marginRight: '2px'
      },
      diffPrimitive: {
        fontSize: '0.75em',
        marginRight: '3px'
      },
      nodeSummary: {
        float: 'right',
        fontSize: '0.8em',
        color: 'darkCyan'
      },
      nodeKeysCount: {
        marginLeft: '5px',
        marginRight: '2px'
      },
      nodePrimitivesCount: {
        fontSize: '0.75em',
        marginRight: '3px'
      }
    };

    return (
      <div>
        <div>
          <SliderButton
            theme={theme}
            type='stepLeft'
            style={styles.sliderButton}
            disabled={currentStateIndex <= 0}
            onClick={this.stepLeft}
          />
          <div style={styles.sliderContainer}>
            <div style={styles.nodeSummary}>
              <span>
                <span style={styles.nodeKeysCount}>
                  {stateCount.keys}
                </span>
                <span style={styles.nodePrimitivesCount}>
                  ({stateCount.primitives})
                </span>
              </span>
            </div>
            <div style={styles.diffSummary}>
              {(totals.added > 0 || primitives.added > 0) &&
                <span style={styles.diffAdded}>
                  <span style={styles.diffTotal}>
                    <strong>+</strong>{totals.added}
                  </span>
                  <span style={styles.diffPrimitive}>
                    ({primitives.added})
                  </span>
                </span>
              }
              {(totals.removed > 0 || primitives.removed > 0) &&
                <span style={styles.diffRemoved}>
                  <span style={styles.diffTotal}>
                    <strong>-</strong>{totals.removed}
                  </span>
                  <span style={styles.diffPrimitive}>
                    ({primitives.removed})
                  </span>
                </span>
              }
              {(totals.changed > 0 || primitives.changed > 0) &&
                <span style={styles.diffChanged}>
                  <span style={styles.diffTotal}>
                    {totals.changed}
                  </span>
                  <span style={styles.diffPrimitive}>
                    ({primitives.changed})
                  </span>
                </span>
              }
            </div>
            <Slider
              type='range'
              label={actionType}
              sublabel={`(${actionId} / ${max})`}
              min={0}
              max={max}
              value={currentStateIndex}
              onChange={this.handleSliderChange}
              style={styles.slider}
              theme={theme}
            />
          </div>
          <SliderButton
            theme={theme}
            style={styles.sliderButton}
            type='stepRight'
            disabled={currentStateIndex === max}
            onClick={this.stepRight}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
          <div style={{
            width: 'calc(50% - 20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            fontSize: '0.6rem'
          }}>
            <Button key='center' theme={theme}>Center</Button>
          </div>
          <div style={{ width: '35px', display: 'flex' }}>
            {playPause}
          </div>
          <div style={{
            width: 'calc(50% - 20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            fontSize: '0.6rem'
          }}>
            <SegmentedControl
              className='playspeeds'
              theme={theme}
              values={['Live', '1x', '2x']}
              selected={replaySpeed}
              onClick={this.changeReplaySpeed}
            />
            <div style={{
              display: 'flex'
            }}>
              <Button
                key='reset'
                theme={theme}
                onClick={this.handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
