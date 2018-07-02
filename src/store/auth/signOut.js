import Immutable from "immutable";
import { createReducer } from "redux-immutablejs";
import * as A from 'constants/auth';

const initialState = {
  loading: false,
  errors: null
};

export default createReducer(Immutable.fromJS({}), {
  [A.SET_ENDPOINT_KEYS]: (state, { payload: { endpoints } }) =>
    state.merge(endpoints.reduce((coll, k) => {
      coll[k] = Immutable.fromJS(initialState);
      return coll;
    }, {})),

  [A.SIGN_OUT_START]: (state, {endpoint}) =>
    state.setIn([endpoint, "loading"], true),

  [A.SIGN_OUT_COMPLETE]: (state, {endpoint}) => state.mergeDeep({
    [endpoint]: { loading: false, errors: null } }),

  [A.SIGN_OUT_ERROR]: (state, { endpoint, errors }) => {
    return state.mergeDeep({
      [endpoint]: {
        loading: false,
        errors
      }
    });
  }
});
