import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withTheme from '@material-ui/core/styles/withTheme';
import { TableRow, TableCell } from '@material-ui/core';
import css from './Song.scss';
import { RenderStars, RenderDifficulty } from 'components/Field';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import { uiShowModal, MODAL_ADD_SONG } from 'store/ui';

const rowStyle = { };
const colStyle = {
  textAlign: 'center'
};
export const Song = ({
  songValues,
  currentSongId,
  showViewSongModal,
  maxDifficulty,
  theme,
  ...custom }) => {
  return (
    <TableRow
      hover
      selected={currentSongId === songValues.id}
      onDoubleClick={showViewSongModal}
      style={rowStyle}
      {...custom}>
      <TableCell
        style={colStyle}
        className={css.title}>
        { songValues.title }
      </TableCell>
      <TableCell
        style={colStyle}
        className={css.artist}>
        {songValues.artist.lastName}
      </TableCell>
      <TableCell
        style={colStyle}
        className={css.progress}>
        <RenderStars number={songValues.progress} starColor={theme.instrumental.starColor} />
      </TableCell>
      <TableCell
        style={colStyle}
        className={css.difficulty}>
        <RenderDifficulty
          difficulty={songValues.difficulty}
          maxDifficulty={maxDifficulty} />
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
  showViewSongModal: PropTypes.func,
  maxDifficulty: PropTypes.number.isRequired,
  theme: PropTypes.object
};

const showViewSongModal = () => uiShowModal(MODAL_ADD_SONG, 'view');

const mapStateToProps = (state, action) => ({
  currentSongId:   state.SongsView.currentSong,
  maxDifficulty:   maxDifficultySelector(state)
});

const mapActionCreators = ({
  showViewSongModal
});

export default connect(mapStateToProps, mapActionCreators)(withTheme()(Song));
