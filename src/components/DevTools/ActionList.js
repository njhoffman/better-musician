import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
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
  componentDidMount() {
    // this.scrollToBottom(true);
  }

  componentDidUpdate(prevProps) {
    if (this.props.lastActionId !== prevProps.lastActionId) {
      // this.scrollToBottom();
    }
  }

  render() {
    const { styling, actions, actionIds, isWideLayout, onToggleAction, skippedActionIds,
      selectedActionId, startActionId, onSelect, onSearch, searchValue, currentActionId,
      onCommit, onSweep, onJumpToState } = this.props;
    const lowerSearchValue = searchValue && searchValue.toLowerCase();
    const filteredActionIds = (searchValue ? actionIds.filter(
      id => actions[id].action.type.toLowerCase().indexOf(lowerSearchValue) !== -1
    ) : actionIds);

    return (

      <div
        key='actionList'
        {...styling(
          ['actionList', isWideLayout ? 'actionListWide' : null], isWideLayout
        )}
      >
        <ActionListHeader styling={styling}
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
  }
}
