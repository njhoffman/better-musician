import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Row, Column, Breakpoints } from 'react-foundation';
import { withTheme } from '@material-ui/core/styles';

import config from 'data/config';
import HeaderLeft from './HeaderLeftContainer';
import HeaderMiddle from './HeaderMiddleContainer';
import HeaderRight from './HeaderRightContainer';
import css from './Header.scss';

export class Header extends Component {
  render() {
    const { ...props } = this.props;
    const headerStyle = {
      background: props.theme.instrumental.headerBackground,
      color: props.theme.instrumental.headerLinksColor
    };
    if (props.isSignedIn) {
      return (
        <div
          style={headerStyle}
          className={`${css.header} ${config.prefix}header`}>
          <Row className={css.wrapper}>
            <Column small={6} medium={3} className={css.headerLeft}>
              <HeaderLeft {...props} />
            </Column>
            <Column medium={6} className={css.headerMiddle} showFor={Breakpoints.MEDIUM}>
              <HeaderMiddle {...props} />
            </Column>
            <Column small={6} medium={3} className={css.headerRight}>
              <HeaderRight {...props} />
            </Column>
          </Row>
          <Row className={css.wrapper} showOnlyFor={Breakpoints.SMALL}>
            <Column className={css.headerMiddle}>
              <HeaderMiddle {...props} />
            </Column>
          </Row>
        </div>
      );
    } else {
      return (
        <div
          style={headerStyle}
          className={`${css.header} ${config.prefix}header`}>
          <Row className={css.wrapper}>
            <Column small={6} className={css.headerLeft}>
              <HeaderLeft {...props} />
            </Column>
            <Column small={6} className={css.headerRight}>
              <HeaderRight {...props} />
            </Column>
          </Row>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps)(withTheme()(Header));
