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
    showInspector:    false,
    showChart:        false,
    showToolbar:      false,
    showExtension:    false,
    inspectorOptions: {},
    chartOptions:     {},
    loggerOptions:    {}
  }
};

const configureLoad = (state, { payload: { devConfig, endpoints, clientInfo, appInfo } }) => ({
  ...state,
  app:       { ...state.app, ...appInfo },
  client:    { ...state.client, ...clientInfo },
  endpoints: { ...state.endpoints, ...endpoints },
  dev:       { ...state.dev, ...devConfig }
});


const ACTION_HANDLERS = {
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
