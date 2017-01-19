// ------------------------------------
// Constants
// ------------------------------------

export const UPDATE_FIELDS = 'UPDATE_PROFILE';
export const FIELDS_SUCCESS = 'FIELDS_SUCCESS';
export const FIELDS_FAILURE = 'FIELDS_FAILURE';


// ------------------------------------
// Actions
// ------------------------------------

export const updateFields = () => (dispatch) => {
  const fieldValues = getState().form.updateFields.values;
  return dispatch({
    [CALL_API]: {
      types: [ UPDATE_FIELDS, FIELDS_SUCCESS, FIELDS_FAILURE ],
      method: 'POST',
      endpoint: '/fields/update',
      payload: { ...fieldValues }
    }
  });
};

export const actions = {
  updateFields
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = { };

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function fieldsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
