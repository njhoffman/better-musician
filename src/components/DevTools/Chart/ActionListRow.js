import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import debounce from 'lodash.debounce';
import RightSlider from './RightSlider';

const BUTTON_SKIP = 'Skip';
const BUTTON_JUMP = 'Jump';

export default class ActionListRow extends PureComponent {
  static propTypes = {
    styling:       PropTypes.func,
    isSelected:    PropTypes.bool,
    action:        PropTypes.object,
    isInitAction:  PropTypes.bool,
    onSelect:      PropTypes.func,
    onJumpClick:   PropTypes.func,
    onToggleClick: PropTypes.func,
    timestamps:    PropTypes.object,
    isSkipped:     PropTypes.bool,
    isInFuture:    PropTypes.bool,
    isActive:      PropTypes.bool,
    isHidden:      PropTypes.bool,
    customStyling: PropTypes.object,
    actionId:      PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    const {
      styling, isSelected, action, isInitAction, onSelect, onJumpClick,
      timestamps, isSkipped, isInFuture, isActive,
      isHidden, customStyling, actionId
    } = this.props;

    const { hover } = this.state;
    const showActionId = false;
    const timeDelta = timestamps.current - timestamps.previous;
    const showButtons = hover && !isInitAction || isSkipped;

    const isButtonSelected = btn => btn === BUTTON_SKIP && isSkipped;

    let actionType = action.type;
    if (typeof actionType === 'undefined') actionType = '<UNDEFINED>';
    else if (actionType === null) actionType = '<NULL>';
    else actionType = actionType.toString() || '<EMPTY>';

    return (
      <div
        onClick={onSelect}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        style={customStyling}
        {...styling([
          'actionListItem',
          isSelected ? 'actionListItemSelected' : null,
          isSkipped ? 'actionListItemSkipped' : null,
          isInFuture ? 'actionListFromFuture' : null,
          isActive ? 'actionListIsActive' : null,
          isHidden ? 'actionListIsHidden' : null
        ])}>
        <div
          onDoubleClick={onJumpClick}
          {...styling([
            'actionListItemName',
            isSkipped ? 'actionListItemNameSkipped' : null
          ])}
        >
          {actionType}
        </div>
        <div {...styling('actionListItemButtons')}>
          <RightSlider styling={styling} shown={!showButtons} rotate>
            <div {...styling('actionListItemTime')}>
              {showActionId ? (timeDelta === 0
                ? '+00:00:00' : dateformat(timeDelta, timestamps.previous ? '+MM:ss.L' : 'h:MM:ss.L')
              ) : actionId}
            </div>
          </RightSlider>
          <RightSlider styling={styling} shown={showButtons} rotate>
            <div {...styling('actionListItemSelector')}>
              {[BUTTON_JUMP, BUTTON_SKIP].map(btn => (!isInitAction || btn !== BUTTON_SKIP) &&
                <div
                  key={btn}
                  onClick={this.handleButtonClick.bind(this, btn)}
                  {...styling([
                    'selectorButton',
                    isButtonSelected(btn) ? 'selectorButtonSelected' : null,
                    'selectorButtonSmall'
                  ], isButtonSelected(btn), true)}>
                  {btn}
                </div>
              )}
            </div>
          </RightSlider>
        </div>
      </div>
    );
  }

  handleButtonClick(btn, e) {
    e.stopPropagation();

    switch (btn) {
      case BUTTON_SKIP:
        this.props.onToggleClick();
        break;
      case BUTTON_JUMP:
        this.props.onJumpClick();
        break;
    }
  }

  handleMouseEnter = (e) => {
    if (this.hover) return;
    this.handleMouseEnterDebounced(e.buttons);
  }

  handleMouseEnterDebounced = debounce((buttons) => {
    if (buttons) return;
    this.setState({ hover: true });
  }, 300)

  handleMouseLeave = () => {
    this.handleMouseEnterDebounced.cancel();
    if (this.state.hover) this.setState({ hover: false });
  }

  handleMouseDown = (e) => {
    if (e.target instanceof Element && e.target.className.indexOf('selectorButton') === 0) return;
    if (this.handleMouseEnterDebounced) this.handleMouseEnterDebounced.cancel();
    if (this.state.hover) this.setState({ hover: false });
  }
}
