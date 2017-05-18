import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { RenderStars, RenderDifficulty } from 'components/Field';
import muiThemeable from 'material-ui/styles/muiThemeable';

import css from './Footer.scss';

export class Footer extends Component {
  static propTypes = {
    song: PropTypes.object,
    muiTheme: PropTypes.object.isRequired,
    stats: PropTypes.object,
    isSignedIn: PropTypes.bool.isRequired,
    maxDifficulty: PropTypes.number
  }

  renderBlankFooter(backgroundColor) {
    return (
      <div
        style={{ backgroundColor }}
        className={css.footerWrapper}>
        <Row className={css.footer} />
      </div>
    );
  }

  renderSongStatsFooter(stats, backgroundColor) {
    return (
      <div
        style={{ backgroundColor }}
        className={css.footerWrapper}>
        <Row className={css.footerStats}>
          <Column
            small={3}
            centerOnSmall
            className={css.leftColumn}>
            <div className={css.fieldWrapper}>
              <div className={css.field}>
                <span>No Filters</span>
              </div>
            </div>
          </Column>
          <Column
            small={6}
            centerOnSmall
            className={css.middleColumn}>
            <div className={css.fieldWrapper}>
              <div className={css.field}>
                <span>Total {stats.songCount} songs</span>
                <span>from {stats.artistCount} artists</span>
                <span> in {stats.genreCount} genres </span>
              </div>
            </div>
          </Column>
          <Column
            small={3}
            centerOnSmall
            className={css.rightColumn}>
            <div className={css.fieldWrapper}>
              <div className={css.field}>
                <span>Average Difficulty</span>
                <span>Average Progress</span>
                <span>Progress Rate</span>
              </div>
            </div>
          </Column>
        </Row>
      </div>
    );
  }

  renderSongFooter(song, backgroundColor) {
    const artistPicture = song.artist.pictures && song.artist.pictures[0]
      ? 'artists/' + song.artist.pictures[0]
      : 'artists/unknown_artist.png';
    return (
      <div
        style={{ backgroundColor }}
        className={css.footerWrapper}>
        <Row className={css.footerSong}>
          <Column
            small={3}
            className={css.leftColumn}>
            <img
              className={css.instrumentPicture}
              src={'instruments/' + song.instrument.picture} />
            <img
              className={css.artistPicture}
              src={artistPicture} />
          </Column>
          <Column
            small={7}
            className={css.middleColumn}>
            <Row>
              <Column>
                <div className={css.songTitle}>
                  { song.title }
                </div>
              </Column>
            </Row>
            <Row>
              <Column>
                <div className={css.artistName}>
                  { song.artist.fullName }
                </div>
                <div className={css.genreName}>
                  { song.genre.name }
                </div>
              </Column>
            </Row>
          </Column>
          <Column
            small={2}
            className={css.rightColumn}>
            <Row>
              <Column>
                <RenderDifficulty
                  difficulty={song.difficulty}
                  maxDifficulty={this.props.maxDifficulty} />

              </Column>
            </Row>
            <Row>
              <Column>
                <RenderStars number={song.progress} starColor={this.props.muiTheme.starColor} />
              </Column>
            </Row>
          </Column>
        </Row>
      </div>
    );
  };

  render() {
    const { song, stats, isSignedIn, muiTheme } = this.props;
    const backgroundColor = muiTheme.palette.canvasColor;
    // TODO: figure out why this is double firing
    if (song && song.artist) {
      return this.renderSongFooter(song, backgroundColor);
    } else if (isSignedIn) {
      return this.renderSongStatsFooter(stats, backgroundColor);
    } else {
      return this.renderBlankFooter(backgroundColor);
    }
  }
};

Footer.propTypes = {
};

export default muiThemeable()(Footer);
