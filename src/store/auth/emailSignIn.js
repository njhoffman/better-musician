import Immutable from "immutable";
import { createReducer } from "redux-immutablejs";
import * as A from 'constants/auth';

const initialState = {
  loading: false,
  errors: null,
  form: {}
};

export default createReducer(Immutable.fromJS({}), {
  [A.SET_ENDPOINT_KEYS]: (state, { payload: { endpoints } }) =>
    state.merge(endpoints.reduce((coll, k) => {
      coll[k] = Immutable.fromJS(initialState);
      return coll;
    }, {})),

  [A.EMAIL_SIGN_IN_START]: (state, {endpoint}) => state.setIn([endpoint, "loading"], true),

  [A.EMAIL_SIGN_IN_COMPLETE]: (state, { payload: { endpoint } }) => state.merge({[endpoint]: initialState}),

  [A.EMAIL_SIGN_IN_ERROR]: (state, {endpoint, errors}) => state.mergeDeep({
    [endpoint]: {
      loading: false,
      errors
    }
  }),

  [A.EMAIL_SIGN_IN_FORM_UPDATE]: (state, {endpoint, key, value}) => {
    return state.mergeDeep({
      [endpoint]: {
        form: {
          [key]: value
        }
      }
    });
  }
});
