import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withTheme from '@material-ui/core/styles/withTheme';
import { TableRow, TableCell } from '@material-ui/core';
import { Stars, Difficulty } from 'components/Field';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import { uiShowAddSongModal } from 'actions/ui';

const rowStyle = { };
const colStyle = {
  // textAlign: 'center',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
};

export const Song = ({
  songValues,
  currentSongId,
  uiShowAddSongModal,
  maxDifficulty,
  theme,
  ...props
}) => {
  return (
    <TableRow
      hover
      selected={currentSongId === songValues.id}
      onDoubleClick={() => uiShowAddSongModal('view')}
      style={rowStyle}
      {...props}>
      <TableCell style={colStyle}>
        { songValues.title }
      </TableCell>
      <TableCell style={colStyle}>
        {songValues.artist.lastName}
      </TableCell>
      <TableCell style={colStyle}>
        <Stars number={songValues.progress} starColor={theme.instrumental.starColor} />
      </TableCell>
      <TableCell style={colStyle}>
        <Difficulty difficulty={songValues.difficulty} maxDifficulty={maxDifficulty} />
      </TableCell>
    </TableRow>
  );
};

Song.propTypes = {
  currentSongId: PropTypes.string,
  songValues: PropTypes.shape({
    completed: PropTypes.bool,
    title:     PropTypes.string.isRequired,
    progress:  PropTypes.number,
    difficulty: PropTypes.number
  }).isRequired,
  uiShowAddSongModal: PropTypes.func.isRequired,
  maxDifficulty: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state, action) => ({
  currentSongId:   state.SongsView.currentSong,
  maxDifficulty:   maxDifficultySelector(state)
});

const mapActionCreators = ({
  uiShowAddSongModal
});

export default connect(mapStateToProps, mapActionCreators)(withTheme()(Song));
