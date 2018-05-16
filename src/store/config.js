import _ from 'lodash';

export const LOAD_CONFIG = 'LOAD_CONFIG';

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
    type: LOAD_CONFIG,
    payload: _.defaultsDeep(config, defaultConfig)
  }));
};

// ------------------------------------
// Action Handlers
// ------------------------------------


const ACTION_HANDLERS = {
  [LOAD_CONFIG]: (state, action) => ({ ...state, ...(_.omit(action.payload, 'api')) })
};

export default function configReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;

}
