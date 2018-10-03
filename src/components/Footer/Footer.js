import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { Stars, Difficulty } from 'components/Field';
import { withStyles, Typography } from '@material-ui/core';

import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import {
  currentSong as currentSongSelector,
  songStats as songStatsSelector
} from 'routes/Songs/modules/selectors';

import css from './Footer.scss';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.instrumental.canvasColor || theme.palette.background.default
  },
  stars: {
    color: theme.instrumental.starColor
  }
});

const BlankFooter = ({ classes }) => (
  <div className={classes.root}>
    <Row className={css.footer} />
  </div>
);

BlankFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

const SongStatsFooter = ({ classes, stats }) => (
  <div className={classes.root}>
    <Row className={css.footerStats}>
      <Column small={3} centerOnSmall className={css.leftColumn}>
        <div className={css.fieldWrapper}>
          <div className={css.field}>
            <Typography>No Filters</Typography>
          </div>
        </div>
      </Column>
      <Column small={6} centerOnSmall className={css.middleColumn}>
        <div className={css.fieldWrapper}>
          <div className={css.field}>
            <Typography>Total {stats.songCount} songs</Typography>
            <Typography>from {stats.artistCount} artists</Typography>
            <Typography> in {stats.genreCount} genres </Typography>
          </div>
        </div>
      </Column>
      <Column small={3} centerOnSmall className={css.rightColumn}>
        <div className={css.fieldWrapper}>
          <div className={css.field}>
            <Typography>Average Difficulty</Typography>
            <Typography>Average Progress</Typography>
            <Typography>Progress Rate</Typography>
          </div>
        </div>
      </Column>
    </Row>
  </div>
);

SongStatsFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired
};

const SongFooter = ({ classes, maxDifficulty, song }) => (
  <div className={classes.root}>
    <Row className={css.footerSong}>
      <Column small={3} className={css.leftColumn}>
        <img
          className={css.instrumentPicture}
          src={song.instrument.primaryImage} />
        <img
          className={css.artistPicture}
          src={song.artist.primaryImage} />
      </Column>
      <Column small={7} className={css.middleColumn}>
        <Row className={css.middleTop}>
          <Column>
            <div className={css.songTitle}>
              <Typography>{song.title}</Typography>
            </div>
          </Column>
        </Row>
        <Row className={css.middleBottom}>
          <Column>
            <div className={css.artistName}>
              <Typography>{song.artist.fullName}</Typography>
            </div>
            <div className={css.genreName}>
              <Typography>{song.genre.name}</Typography>
            </div>
          </Column>
        </Row>
      </Column>
      <Column small={2} className={css.rightColumn}>
        <Row>
          <Column>
            <Difficulty difficulty={song.difficulty} maxDifficulty={maxDifficulty} />
          </Column>
        </Row>
        <Row>
          <Column>
            <Stars number={song.progress} className={classes.stars} />
          </Column>
        </Row>
      </Column>
    </Row>
  </div>
);

SongFooter.propTypes = {
  classes:       PropTypes.object.isRequired,
  song:          PropTypes.object.isRequired,
  maxDifficulty: PropTypes.number.isRequired
};

const Footer = ({ song, isSignedIn, ...props }) => {
  if (song && song.artist) {
    return SongFooter({ song, ...props });
  } else if (isSignedIn) {
    return SongStatsFooter({ ...props });
  } else {
    return BlankFooter({ ...props });
  }
};

Footer.propTypes = {
  song:          PropTypes.object,
  isSignedIn:    PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  song:          currentSongSelector(state),
  isSignedIn:    state.user.isSignedIn,
  stats:         songStatsSelector(state),
  maxDifficulty: maxDifficultySelector(state)
});

const mapActionCreators  = {};
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(Footer));
