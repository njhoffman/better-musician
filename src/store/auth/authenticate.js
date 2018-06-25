import * as A from "actions/auth";

const initialState = {
  loading: false,
  valid: false,
  errors: null
};

const ACTION_HANDLERS = {
  [A.AUTHENTICATE_START]: state => ({ ...state, ...{ loading: true }}),

  [A.AUTHENTICATE_COMPLETE]: (state) => ({ ...state, ...{
    loading: false,
    errors: null,
    valid: true
  }}),

  [A.AUTHENTICATE_ERROR]: (state, { payload }) => ({ ...state, ...{
    loading: false,
    errors: payload.errors,
    valid: false
  }})
}

export default function createReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
