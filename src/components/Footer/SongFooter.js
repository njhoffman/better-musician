import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { Typography } from '@material-ui/core';

import { Stars, Difficulty } from 'components/Field';

const SongFooter = ({ classes, maxDifficulty, song }) => (
  <Row className={classes.footerSong}>
    <Column small={3} className={classes.leftColumn}>
      <div className={classes.instrumentPictureWrapper}>
        <img
          alt='Instrument'
          className={classes.instrumentPicture}
          src={song.instrument.primaryImage}
        />
      </div>
      <div className={classes.artistPictureWrapper}>
        <img
          alt='Artist'
          className={classes.artistPicture}
          src={song.artist.primaryImage}
        />
      </div>
    </Column>
    <Column small={9} className={classes.rightColumn}>
      <Row className={classes.rightTop}>
        <Column>
          <Typography variant='subtitle1' className={classes.songTitle}>
            {song.title}
          </Typography>
        </Column>
      </Row>
      <Row className={classes.rightBottom}>
        <Column>
          <Typography variant='caption' className={classes.artistName}>
            {song.artist.fullName}
          </Typography>
          <Typography variant='overline' className={classes.genreName} color='secondary'>
            {song.genre.name}
          </Typography>
        </Column>
        <Column style={{ textAlign: 'center', display: 'flex-inline', maxWidth: '100px' }}>
          <Difficulty
            difficulty={song.difficulty}
            maxDifficulty={maxDifficulty}
          />
          <Stars
            number={song.progress}
            className={classes.stars}
          />
        </Column>
      </Row>
    </Column>
  </Row>
);

SongFooter.propTypes = {
  classes:       PropTypes.instanceOf(Object).isRequired,
  song:          PropTypes.instanceOf(Object).isRequired,
  maxDifficulty: PropTypes.number.isRequired
};

export default SongFooter;
