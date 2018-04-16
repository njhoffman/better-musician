import React, { Component }  from 'react';
import { Row, Column, Breakpoints } from 'react-foundation';
import withTheme from 'material-ui/styles/withTheme';

import HeaderLeft from './HeaderLeftContainer';
import HeaderMiddle from './HeaderMiddleContainer';
import HeaderRight from './HeaderRightContainer';
import css from './Header.scss';

export class Header extends Component {
  render() {
    const { ...props } = this.props;
    const signedIn = props.user && props.user.get ? props.user.get('isSignedIn') : false;
    if (signedIn) {
      return (
        <div
          style={{
            backgroundColor: props.theme.palette.canvasColor,
            color: props.theme.instrumental.headerLinksColor
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
            backgroundColor: props.theme.palette.canvasColor,
            color: props.theme.instrumental.headerLinksColor
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

export default withTheme()(Header);
