import React, { Component }  from 'react';
import { Row, Column, Breakpoints } from 'react-foundation';
import muiThemeable from 'material-ui/styles/muiThemeable';

import HeaderLeft from './HeaderLeftContainer';
import HeaderMiddle from './HeaderMiddleContainer';
import HeaderRight from './HeaderRightContainer';
import css from './Header.scss';

export class Header extends Component {
  render() {
    const { ...props } = this.props;
    const signedIn = props.user.get('isSignedIn');
    if (signedIn) {
      return (
        <div
          style={{
            backgroundColor: props.muiTheme.palette.canvasColor,
            color: props.muiTheme.instrumental.headerLinksColor
          }}
          className={css.header}>
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
          style={{
            backgroundColor: props.muiTheme.palette.canvasColor,
            color: props.muiTheme.instrumental.headerLinksColor
          }}
          className={css.header}>
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

export default muiThemeable()(Header);
