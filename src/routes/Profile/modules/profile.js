// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

// ------------------------------------
// Actions Creators
// ------------------------------------

export const updateProfile = (values) => (dispatch, getState) => {
  const fieldValues = getState().form.updateProfileForm.values;
  return dispatch({ type: UPDATE_PROFILE, payload: { ...fieldValues } });
};

export const actions = {
   updateProfile
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
