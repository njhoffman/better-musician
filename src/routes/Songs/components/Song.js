import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import css from './Song.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { RenderStars, RenderDifficulty } from 'components/Field';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import { uiShowModal, MODAL_ADD_SONG } from 'store/ui';

export const Song = ({
  songValues,
  showViewSongModal,
  maxDifficulty,
  muiTheme,
  ...custom }) => {
  return (
    <TableRow
      hoverable
      onDoubleClick={showViewSongModal}
      displayBorder
      {...custom}>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
        className={css.title}>
        { songValues.title }
      </TableRowColumn>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
        className={css.artist}>
        { songValues.artist.fullName }
      </TableRowColumn>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
        className={css.progress}>
        <RenderStars number={songValues.progress} starColor={muiTheme.starColor} />
      </TableRowColumn>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
        className={css.difficulty}>
        <RenderDifficulty
          difficulty={songValues.difficulty}
          maxDifficulty={maxDifficulty} />
      </TableRowColumn>
    </TableRow>
  );
};

Song.propTypes = {
  songValues: PropTypes.shape({
    completed: PropTypes.bool,
    title:     PropTypes.string.isRequired,
    progress:  PropTypes.number,
    difficulty: PropTypes.number
  }).isRequired,
  showViewSongModal: PropTypes.func,
  maxDifficulty: PropTypes.number.isRequired,
  muiTheme: PropTypes.object
};

const showViewSongModal = () => uiShowModal(MODAL_ADD_SONG, 'view');

const mapStateToProps = (state, action) => ({
  maxDifficulty:   maxDifficultySelector(state)
});

const mapActionCreators = ({
  showViewSongModal
});

export default connect( mapStateToProps, mapActionCreators)(muiThemeable()(Song));
