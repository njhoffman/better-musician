import React, { Component }  from 'react';
import StarIcon from 'react-icons/lib/md/star';
import { Row, Column, Breakpoints } from 'react-foundation';
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

  renderSong (song) {
    return (
      <div className={css.footerWrapper}>
        <Row className={css.footer}>
          <Column
            small={3}
            className={css.leftColumn}>
            <img
              className={css.instrumentPicture}
              src={"instruments/" + song.instrument.picture} />
            <img
              className={css.artistPicture}
              src={"artists/" + song.artist.picture} />
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
                  { song.genre && song.genre.displayName }
                </div>

              </Column>
            </Row>
          </Column>
          <Column
            small={2}
            className={css.rightColumn}>
            <Row>
              <Column>
                { song.difficulty }
              </Column>
            </Row>
            <Row>
              <Column>
                { [...Array(song.progress)].map((x,i) =>
                  <StarIcon key={i} style={{color: this.props.muiTheme.starColor}} />
                ) }
              </Column>
            </Row>
          </Column>
        </Row>
      </div>
    )
  };

  render () {
    const { song } = this.props;
    // TODO: figure out why this is double firing
    if (song && song.artist) {
      return this.renderSong(song);
    } else {
      return this.renderBlank();
    }
  }
};

Footer.propTypes = {
};

export default muiThemeable()(Footer);
