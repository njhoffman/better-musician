
const SET_ENDPOINT_KEYS = 'SET_ENDPOINT_KEYS';
const SIGN_OUT_START = 'SIGN_OUT_START';
const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';
const SIGN_OUT_COMPLETE = 'SIGN_OUT_COMPLETE';

const ACTION_HANDLERS = {
  [SET_ENDPOINT_KEYS]: (state, { endpoints }) => ({ ...state, ...endpoints }),

  [SIGN_OUT_START]: (state, { endpoint }) =>
    ({ ...state, ...{ ...endpoint, ...{ loading: true } } }),

  [SIGN_OUT_COMPLETE]: (state, { endpoint }) =>
    ({ ...state, ...{ ...endpoint, ...{ loading: true, errors: null } } }),

  [SIGN_OUT_ERROR]: (state, { endpoint, errors }) =>
    ({ ...state, ...{ ...endpoint, ...{ loading: false, errors } } })
};

const initialState = {
  data: null,
  isLoading: false,
  errors: null
};

export default function userUpdate(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
