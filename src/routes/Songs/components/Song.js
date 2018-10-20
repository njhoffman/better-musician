import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withTheme from '@material-ui/core/styles/withTheme';
import { TableRow, TableCell, withStyles } from '@material-ui/core';
import { Stars, Difficulty } from 'components/Field';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import { MODAL_VARIANT_VIEW } from 'constants/ui';
import { uiShowSongModal } from 'actions/ui';
import Tappable from 'react-tappable';

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
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      width: '66%',
    }
  },
  columnArtist: {
    textAlign: 'center'
  },
  columnProgress: {
    textAlign: 'center',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  columnDifficulty: {
    textAlign: 'center',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

export const Song = ({
  classes,
  setCurrentSong,
  songValues,
  currentSongId,
  uiShowSongModal,
  maxDifficulty,
  theme: { app: { starColor }},
  ...props
}) => {
  return (
    <Tappable
      hover
      component={TableRow}
      selected={currentSongId === songValues.id}
      onDoubleClick={() => uiShowSongModal(MODAL_VARIANT_VIEW)}
      onPress={() => {
        setCurrentSong(songValues);
        uiShowSongModal(MODAL_VARIANT_VIEW);
      }}
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
    </Tappable>
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
