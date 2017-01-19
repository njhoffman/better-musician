import { CALL_API, Schemas } from 'middleware/api';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

// ------------------------------------
// Actions Creators
// ------------------------------------

export const updateProfile = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateProfileForm.values;
  return dispatch({
    [CALL_API]: {
      types: [ UPDATE_PROFILE, PROFILE_SUCCESS, PROFILE_FAILURE ],
      method: 'POST',
      endpoint: '/users/update',
      payload: { ...fieldValues }
    }
  });
};

export const actions = {
   updateProfile
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PROFILE_SUCCESS]: (state, action) => {
    debugger;
    return state;
  },
  [PROFILE_FAILURE]: (state, action) => {
    debugger;
    return state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
