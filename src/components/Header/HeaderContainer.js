import { connect } from 'react-redux';
import { visualTheme as visualThemeSelector } from 'selectors/users';
import Header from './Header';

const mapActionCreators = { };

const mapStateToProps = (state) => ({
  user:            state.auth.get('user'),
  visualTheme:     visualThemeSelector(state),
  currentView:     state.location ? state.location.currentView : null
});

export default connect(mapStateToProps, mapActionCreators)(Header);
