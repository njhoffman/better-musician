import * as AUTH from 'constants/auth';
import * as API from 'constants/api';
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
  [API.CONFIGURE_START]: (state, action) => ({
    ...state,
    auth: { ...state.auth, loading: true }
  }),

  [API.CONFIGURE_COMPLETE]: (state, { payload }) => ({
    ...state,
    auth: { ...state.auth, loading: false, errors: null, config: payload }
  }),

  [API.CONFIGURE_ERROR]: (state, { errors }) => ({
    ...state,
    auth: { ...state.auth, loading: false, errors }
  }),

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
