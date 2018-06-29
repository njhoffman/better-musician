import _ from 'lodash';

import * as A from 'constants/auth';

const defaultConfig = {
  api: {
    url: '',
    endpoints: {
      logout: '/users/logout',
      login: '/users/login',
      register: '/users/register',
      userUpdate: '/users/update',
      userDelete: '/users/delete',
      passwordReset: '/users/password_reset',
      passwordUpdate: '/users/password_update',
      validateToken: '/users/validate_token',
      loginProviders: {
        github: '/users/login/github',
        facebook: '/users/login/facebook'
      }
    }
  },
  dev: {
    showDevTools: true,
    inspector: {
      actions: {
        include: [],
        exclude: [],
        color: []
      }
    },
    log: {
      level: 'trace',
      expandObjects: true,
      clearOnReload: true,
      levels: {
        color: []
      },
      subsystems: {
        include: [],
        exclude: [],
        color: []
      },
      actions: {
        include: [],
        exclude: [],
        color: []
      }
    }
  },
  auth: {
    loading: true,
    errors: null,
    config: null,
    endpointKeys: null,
    defaultEndpointKey: null,
    currentEndpointKey: null
  },
  serverSideRendering : false,
  clientOnly          : true
  // cleanSession:        true
};

const initialState = _.omit(defaultConfig, 'api');

// ------------------------------------
// Action Creators
// ------------------------------------

export const loadConfig = (config) => (dispatch) => {
  return Promise.resolve(dispatch({
    type: A.LOAD_CONFIG,
    payload: _.defaultsDeep(config, defaultConfig)
  }));
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  // [LOAD_CONFIG]: (state, action) =>
  // ({ ...state, ...(_.omit(action.payload, 'api')) }),
  //
  [A.CONFIGURE_START]: (state, action) =>
    ({ ...state, ...(_.omit(action.payload, 'api')), auth: { ...state.auth, loading: true } }),

  [A.STORE_CURRENT_ENDPOINT_KEY]: (state, { currentEndpointKey }) =>
    ({ ...state, auth: { ...state.auth, currentEndpointKey } }),

  [A.SET_ENDPOINT_KEYS]: (state, { endpointKeys, defaultEndpointKey, currentEndpointKey }) =>
    ({ ...state, auth: { ...state.auth, endpointKeys, defaultEndpointKey, currentEndpointKey } }),

  [A.CONFIGURE_COMPLETE]: (state, { payload }) => ({ ...state,
    auth: { ...state.auth,
      ...{
        loading: false,
        errors: null,
        config: payload
      } } }),

  [A.CONFIGURE_ERROR]: (state, { errors }) => ({ ...state,
    auth: { ...state.auth,
      ...{
        loading: false,
        errors
      } } })
};

export default function configReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
