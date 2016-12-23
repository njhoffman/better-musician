import React, { Component }  from 'react';
import { Row, Column, Breakpoints } from 'react-foundation';

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
          <Column>
            { song.instrument.name }
          </Column>
          <Column>
            <Row>
              <Column>
                { song.title }
              </Column>
            </Row>
            <Row>
              <Column>
                { song.artist.fullName }
              </Column>
            </Row>
          </Column>
          <Column>
            <Row>
              <Column>
                (Year)
              </Column>
            </Row>
            <Row>
              <Column>
                { song.genre.displayName }
              </Column>
            </Row>
          </Column>
          <Column>
            <Row>
              <Column>
                { song.progress }
              </Column>
            </Row>
            <Row>
              <Column>
                { song.difficulty }
              </Column>
            </Row>
          </Column>
        </Row>
      </div>
    )
  };

  render () {
    const { song } = this.props;
    if (song) {
      return this.renderSong(song);
    } else {
      return this.renderBlank();
    }
  }
};

Footer.propTypes = {
};

export default Footer;
