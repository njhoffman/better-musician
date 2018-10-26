import _ from 'lodash';
import * as API from 'constants/api';
import * as AUTH from 'constants/auth';

const loadApiEndpoints = (endpoints, roles = []) => {
  // TODO: make api endpoint extension and nesting recursive
  const apiEndpoints = { ...endpoints.default };
  roles.forEach(role => {
    _.merge(apiEndpoints, { [role]: endpoints[role] });
  });

  const results = _.mapValues(apiEndpoints, ep1 => {
    // apiURL
    if (_.isString(ep1)) {
      return ep1;
    }
    return _.mapValues(ep1, ep2 => {
      // first order route
      if (_.isString(ep2)) {
        return {
          loading: false,
          errors: false,
          success: false
        };
      }
      return _.mapValues(ep2, () => ({
        loading: false,
        errors: false,
        success: false
      }));
    });
  });
  return results;
};

const ACTION_HANDLERS = {

  [API.CONFIGURE_LOAD] : (state, { payload: { endpoints } }) => ({
    ...state,
    ...loadApiEndpoints(endpoints)
  }),

  [AUTH.AUTHENTICATE_COMPLETE] : (state, { payload: { user, endpoints } }) => ({
    ...state,
    ...loadApiEndpoints(endpoints, user.roles)
  }),

  [AUTH.EMAIL_SIGN_IN_START] : (state) => ({
    ...state,
    auth: {
      ...state.auth,
      login: { loading: true, success: false, errors: [] }
    }
  }),

  [AUTH.EMAIL_SIGN_IN_COMPLETE] : (state) => ({
    ...state,
    auth: {
      ...state.auth,
      login: { loading: false, success: true, errors: [] }
    }
  }),

  [AUTH.EMAIL_SIGN_IN_ERROR] : (state, { payload: { errors } }) => ({
    ...state,
    auth: {
      ...state.auth,
      login: { ...state.auth.login, loading: false, success: false, errors }
    }
  }),

  // [SONGS_FETCH_START] : (state) => ({ ...state, loading: true }),
  // [SONGS_FETCH_COMPLETE] : (state) => ({
  //   ...state,
  //   loading: false,
  //   initialized: state.initialized.indexOf('songs') === -1 ? state.initialized.concat('songs') : state.initialized
  // }),
  // [USER_UPDATE_START] : (state) => ({ ...state, loading: true }),
  // [USER_UPDATE_COMPLETE] : (state) => ({ ...state, loading: false }),
  // [USER_UPDATE_ERROR] : (state) => ({ ...state, loading: false }),
  // [SONGS_ADD_START] : (state) => ({ ...state, loading: true }),
  // [SONGS_ADD_COMPLETE] : (state) => ({ ...state, loading: false }),
  // [SONGS_ADD_ERROR] : (state) => ({ ...state, loading: false })
};

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = { };

export default function apiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
