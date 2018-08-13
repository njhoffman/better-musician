import * as A from 'constants/auth';
import userConfig from 'config';

const defaultConfig = {
  auth: {
    loading: true,
    errors: null,
    config: null,
    endpointKeys: null,
    defaultEndpointKey: null,
    currentEndpointKey: null
  },
};

const initialState = { ...defaultConfig, ...userConfig };

const ACTION_HANDLERS = {
  [A.CONFIGURE_START]: (state, action) => ({
    ...state,
    auth: { ...state.auth, loading: true }
  }),

  [A.CURRENT_ENDPOINT_KEY]: (state, { payload: { currentEndpointKey } }) => ({
    ...state,
    auth: { ...state.auth, currentEndpointKey }
  }),

  [A.ENDPOINT_KEYS]: (state, { payload: { endpointKeys, defaultEndpointKey, currentEndpointKey } }) => ({
    ...state,
    auth: { ...state.auth, endpointKeys, defaultEndpointKey, currentEndpointKey }
  }),

  [A.CONFIGURE_COMPLETE]: (state, { payload }) => ({
    ...state,
    auth: { ...state.auth, loading: false, errors: null, config: payload }
  }),

  [A.CONFIGURE_ERROR]: (state, { errors }) => ({
    ...state,
    auth: { ...state.auth, loading: false, errors }
  })
};

export default function configReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
