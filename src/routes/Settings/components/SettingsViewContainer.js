import { connect } from 'react-redux';
import SettingsView from './SettingsView';
import { updateUser } from 'store/api';

const setTheme = (theme) => (dispatch, getState) => {
  const user = getState().auth.get('user');
  if (user) {
    const attrs = user.get('attributes').toJS();
    attrs.visualTheme = theme;
    dispatch({ type: 'AUTHENTICATE_COMPLETE', user: attrs });
  }
};

const mapActionCreators = {
  resetSettings : updateUser,
  updateSettings : updateUser,
  setTheme
};

const mapStateToProps = (state) => ({
  api: state.api,
  initialValues: state.auth.get('user').get('attributes').toJS(),
  settings: state.auth.get('user').get('attributes')
});

export default connect(mapStateToProps, mapActionCreators)(SettingsView);
