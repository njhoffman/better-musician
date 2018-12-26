import _ from 'lodash';

import * as DEV from 'constants/dev';
import * as CONF from 'constants/config';
import * as API from 'constants/api';
import * as AUTH from 'constants/auth';
import * as UI from 'constants/ui';

const initialState = {
  loading: false,
  auth: {
    loading:            true,
    errors:             null,
    config:             null,
    endpointKeys:       null,
    defaultEndpointKey: null,
    currentEndpointKey: null
  },
  endpoints: {},
  client: {
    device: {},
    screen: {}
  },
  app: {
    appVersion: `${__APP_VERSION__}`,
    apiVersion: '?.?.?'
  },
  dev: {
    inspector: { },
    extension: { },
    chart: { },
    logger: { },
    toolbar: { }
  }
};

const configureLoad = (state, { payload: { devConfig, endpoints, clientInfo, appInfo } }) => ({
  ...state,
  app:       { ...state.app, ...appInfo },
  client:    { ...state.client, ...clientInfo },
  endpoints: { ...state.endpoints, ...endpoints },
  dev:       { ...state.dev, ...devConfig }
});

const updateDevSetting = (state, payload) => {
  const key = Object.keys(payload)[0];
  const val = payload[key];
  const devState = _.cloneDeep(state.dev);
  _.set(devState, key, val);
  return { ...state, dev: devState };
};

const ACTION_HANDLERS = {
  [DEV.UPDATE_SETTING]: (state, { payload }) => updateDevSetting(state, payload),

  [API.GET_VERSION_COMPLETE]: (state, { payload }) => ({
    ...state,
    loading: true,
    app: { ...state.app, apiVersion: payload.version },
  }),

  [CONF.CONFIGURE_START]: (state, action) => ({
    ...state,
    loading: true,
    auth: { ...state.auth, loading: true },
  }),

  [CONF.CONFIGURE_LOAD]: configureLoad,
  [CONF.CONFIGURE_COMPLETE]: (state, { payload }) => ({
    ...state,
    loading: false,
    auth: { ...state.auth, loading: false, errors: null }
  }),

  [CONF.CONFIGURE_ERROR]: (state, { errors }) => ({
    ...state,
    auth: { ...state.auth, loading: false, errors },
    dev: { ...state.dev, loading: false, errors }
  }),

  [UI.WINDOW_RESIZE]: configureLoad,

  [AUTH.CURRENT_ENDPOINT_KEY]: (state, { payload }) => ({
    ...state,
    auth: { ...state.auth, currentEndpointKey: payload }
  }),

  [AUTH.ENDPOINT_KEYS]: (state, { payload: { endpointKeys, defaultEndpointKey, currentEndpointKey } }) => ({
    ...state,
    auth: { ...state.auth, endpointKeys, defaultEndpointKey, currentEndpointKey }
  })

};

export default function configReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
