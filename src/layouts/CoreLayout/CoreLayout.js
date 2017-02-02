import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Paper, Snackbar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'coreStyles';
import css from './CoreLayout.scss';
import AuthGlobals from 'components/AuthGlobals';
import Header from 'components/Header/HeaderContainer';
import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenuContainer';
import { Row } from 'react-foundation';

// export const CoreLayout = ({ getState }) => ({ children }) => {

export class CoreLayout extends Component {

  render() {

    const theme = require('themes/' + this.props.theme).default;
    if (!theme.instrumental) {
      theme.instrumental = {};
    }
    theme.instrumental.headerLinksColor = theme.instrumental.headerLinksColor || theme.palette.secondaryTextColor;
    theme.instrumental.footerFiller = theme.instrumental.footerFiller || theme.palette.canvasColor;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className={css.appWrapper}>
          <AuthGlobals />
          <DrawerMenu />
          <Header />
          <div className={css.contentWrapper} style={{ background: theme.backgroundColor }}>
            <Row>
              {this.props.children}
            </Row>
          </div>
          <Footer />
          <div
            style={{ background: theme.instrumental.footerFiller }}
            className={css.footerFiller}>
          </div>
          <Snackbar open={true} action="OK" message="Settings successfully saved." />
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = (state) => ({
  theme: state.auth && state.auth.get('user') && state.auth.get('user').get('attributes')
  ? state.auth.get('user').get('attributes').get('visualTheme')
  : 'steelBlue-dark'
});

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default connect(mapStateToProps)(CoreLayout);
