import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withTheme from '@material-ui/core/styles/withTheme';
import { TableRow, TableCell, withStyles } from '@material-ui/core';
import { Stars, Difficulty } from 'components/Field';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import { MODAL_VARIANT_VIEW } from 'constants/ui';
import { uiShowSongModal } from 'actions/ui';

const rowStyle = { };
const styles = (theme) => ({
  column: {
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: '2px 12px',
    [theme.breakpoints.down('md')]: {
      padding: '1px 4px'
    }

  },
  columnTitle: {
    width: '200px',
  },
  columnArtist: {
    textAlign: 'center'
  },
  columnProgress: {
    textAlign: 'center',
    width: '80px'
  },
  columnDifficulty: {
    textAlign: 'center',
    width: '80px'
  }
});

export const Song = ({
  classes,
  songValues,
  currentSongId,
  uiShowSongModal,
  maxDifficulty,
  theme: { instrumental: { starColor }},
  ...props
}) => {
  return (
    <TableRow
      hover
      selected={currentSongId === songValues.id}
      onDoubleClick={() => uiShowSongModal(MODAL_VARIANT_VIEW)}
      style={rowStyle}
      {...props}>
      <TableCell className={`${classes.column} ${classes.columnTitle}`}>
        { songValues.title }
      </TableCell>
      <TableCell className={`${classes.column} ${classes.columnArtist}`}>
        {songValues.artist.fullName}
      </TableCell>
      <TableCell className={`${classes.column} ${classes.columnProgress}`}>
        <Stars number={songValues.progress} starColor={starColor} />
      </TableCell>
      <TableCell className={`${classes.column} ${classes.columnDifficulty}`}>
        <Difficulty difficulty={songValues.difficulty} maxDifficulty={maxDifficulty} />
      </TableCell>
    </TableRow>
  );
};

Song.propTypes = {
  classes: PropTypes.object.isRequired,
  currentSongId: PropTypes.string,
  songValues: PropTypes.shape({
    completed: PropTypes.bool,
    title:     PropTypes.string.isRequired,
    progress:  PropTypes.number,
    difficulty: PropTypes.number
  }).isRequired,
  uiShowSongModal: PropTypes.func.isRequired,
  maxDifficulty: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state, action) => ({
  currentSongId:   state.SongsView ? state.SongsView.currentSong : null,
  maxDifficulty:   maxDifficultySelector(state)
});

const mapActionCreators = ({
  uiShowSongModal
});

export default connect(mapStateToProps, mapActionCreators)(withTheme()(withStyles(styles)(Song)));
