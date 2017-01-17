import React, { Component }  from 'react';
import StarIcon from 'react-icons/lib/md/star';
import { Row, Column, Breakpoints } from 'react-foundation';
import { RenderStars, RenderDifficulty } from 'components/Field';
import muiThemeable from 'material-ui/styles/muiThemeable';

import css from './Footer.scss';

class Footer extends Component  {

  constructor(props) {
    super(props);
  };

  renderBlank() {
    return (
      <div className={css.footerWrapper}>
        <Row className={css.footer}>
        </Row>
      </div>
    )
  }

  renderSongStatsFooter (stats) {
    return (
      <div className={css.footerWrapper}>
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
    )
  }

  renderSongFoote (song) {
    const artistPicture = song.artist.picture ? "artists/" + song.artist.picture : "artists/unknown_artist.png";
    return (
      <div className={css.footerWrapper}>
        <Row className={css.footerSong}>
          <Column
            small={3}
            className={css.leftColumn}>
            <img
              className={css.instrumentPicture}
              src={"instruments/" + song.instrument.picture} />
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
                  maxDifficulty={this.props.maxDifficulty}/>

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
    )
  };

  render () {
    const { song, stats } = this.props;
    // TODO: figure out why this is double firing
    if (song && song.artist) {
      return this.renderSongFooter(song);
    } else {
      return this.renderSongStatsFooter(stats);
    }
  }
};

Footer.propTypes = {
};

export default muiThemeable()(Footer);
