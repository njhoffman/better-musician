import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ActionListRow from './ActionListRow';
import ActionListHeader from './ActionListHeader';

function getTimestamps(actions, actionIds, actionId) {
  const idx = actionIds.indexOf(actionId);
  const prevActionId = actionIds[idx - 1];

  return {
    current: actions[actionId].timestamp,
    previous: idx ? actions[prevActionId].timestamp : 0
  };
}

export default class ActionList extends PureComponent {
  static propTypes = {
    styling:          PropTypes.object,
    actions:          PropTypes.array,
    actionIds:        PropTypes.array,
    isWideLayout:     PropTypes.bool,
    onToggleAction:   PropTypes.func,
    skippedActionIds: PropTypes.func,
    selectedActionId: PropTypes.number,
    startActionId:    PropTypes.number,
    onSelect:         PropTypes.func,
    onSearch:         PropTypes.func,
    searchValue:      PropTypes.string,
    currentActionId:  PropTypes.number,
    onCommit:         PropTypes.func,
    onSweep:          PropTypes.func,
    onJumpToState:    PropTypes.func
  };
  render() {
    const {
      styling, actions, actionIds, isWideLayout, onToggleAction, skippedActionIds,
      selectedActionId, startActionId, onSelect, onSearch, searchValue, currentActionId,
      onCommit, onSweep, onJumpToState
    } = this.props;
    const lowerSearchValue = searchValue && searchValue.toLowerCase();

    const blacklistedActions = ['@@redux-form/BLUR', '@@redux-form/FOCUS'];
    const styledActions = {
      'CONFIGURE_COMPLETE':            { color: '#88eeaa' },
      'EMAIL_SIGN_IN_ERROR':           { color: 'red', border: 'solid 1px #660000' },
      'EMAIL_SIGN_IN_START':           { color: 'rgba(200, 255, 255, 1)' },
      'EMAIL_SIGN_IN_SUCCESS':         { color: '#00ffaa' },
      '@@redux-form/REGISTER_FIELD':   { color: '#838383' },
      '@@redux-form/UNREGISTER_FIELD': { color: '#838383' },
    };

    const filteredActionIds = (searchValue ? actionIds.filter(id =>
      actions[id].action.type.toLowerCase().indexOf(lowerSearchValue) !== -1) : actionIds);

    /* eslint-disable react/no-string-refs */
    return (
      <div
        key='actionList'
        {...styling(
          ['actionList', isWideLayout ? 'actionListWide' : null], isWideLayout
        )}
      >
        <ActionListHeader
          styling={styling}
          onSearch={onSearch}
          onCommit={onCommit}
          onSweep={onSweep}
          hasSkippedActions={skippedActionIds.length > 0}
          hasStagedActions={actionIds.length > 1} />
        <div {...styling('actionListRows')} ref='rows'>
          {[].concat(filteredActionIds).reverse().map((actionId, i) =>
            <ActionListRow
              key={i}
              actionId={actionId}
              styling={styling}
              isInitAction={!actionId}
              isSelected={
                startActionId !== null &&
                  actionId >= startActionId && actionId <= selectedActionId ||
                  actionId === selectedActionId
              }
              isActive={actionId === currentActionId}
              isInFuture={actionId > currentActionId}
              isHidden={blacklistedActions.indexOf(actions[actionId].action.type) !== -1}
              customStyling={styledActions[actions[actionId].action.type] || {}}
              onSelect={(e) => onSelect(e, actionId)}
              timestamps={getTimestamps(actions, actionIds, actionId)}
              action={actions[actionId].action}
              onToggleClick={() => onToggleAction(actionId)}
              onJumpClick={() => onJumpToState(actionId)}
              onCommitClick={() => onCommit(actionId)}
              isSkipped={skippedActionIds.indexOf(actionId) !== -1} />
          )}
        </div>
      </div>
    );
    /* eslint-enable react/no-string-refs */
  }
}
