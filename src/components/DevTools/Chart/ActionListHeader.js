import React from 'react';
import PropTypes from 'prop-types';
import RightSlider from './RightSlider';

const getActiveButtons = (hasSkippedActions) => [
  hasSkippedActions ? 'Sweep' : null,
  'Commit'
].filter(Boolean);

const ActionListHeader = ({
  styling, onSearch, hasSkippedActions, hasStagedActions, onCommit, onSweep
}) => (
  <div {...styling('actionListHeader')}>
    <input
      {...styling('actionListHeaderSearch')}
      onChange={e => onSearch(e.target.value)}
      placeholder='filter...'
    />
    <div {...styling('actionListHeaderWrapper')}>
      <RightSlider shown={hasStagedActions} styling={styling}>
        <div {...styling('actionListHeaderSelector')}>
          {getActiveButtons(hasSkippedActions).map(btn =>
            <div
              key={btn}
              onClick={() => ({
                Commit: onCommit,
                Sweep: onSweep
              })[btn]()}
              {...styling([
                'selectorButton',
                'selectorButtonSmall'], false, true)}>
                {btn}
              </div>
          )}
        </div>
      </RightSlider>
    </div>
  </div>
);

ActionListHeader.propTypes = {
  styling:           PropTypes.func,
  onSearch:          PropTypes.func,
  hasSkippedActions: PropTypes.bool,
  hasStagedActions:  PropTypes.bool,
  onCommit:          PropTypes.func,
  onSweep:           PropTypes.func
};

export default ActionListHeader;
