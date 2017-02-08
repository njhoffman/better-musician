import { CALL_API } from 'middleware/api';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_FIELD = 'ADD_FIELD';
export const LOAD_FIELDS = 'LOAD_FIELDS';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const EDIT_FIELD = 'EDIT_FIELD';
export const FIELDS_SUCCESS = 'FIELDS_SUCCESS';
export const FIELDS_FAILURE = 'FIELDS_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------

export const updateField = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateFieldsForm.values;
  return dispatch({
    [CALL_API]: {
      types: [ UPDATE_FIELD, fieldsSuccess, FIELDS_FAILURE ],
      method: 'POST',
      endpoint: '/fields/update',
      payload: { ...fieldValues }
    }
  });
};

export const addField = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateFieldsForm.values;
  return dispatch({
    [CALL_API]: {
      types: [ ADD_FIELD, fieldsSuccess, FIELDS_FAILURE ],
      method: 'POST',
      endpoint: '/fields/add',
      payload: { ...fieldValues }
    }
  });
};

export const fieldsSuccess = (data) => (dispatch) => {
  console.info('response', data);
  dispatch({ type: 'ADD_FIELD', payload: data.fields });
};

export const editField = ({ type, label, tabName, optionValues, id }) => (dispatch) => {
  return dispatch({
    type: EDIT_FIELD,
    payload: { type: type.toString(), label, tabName, optionValues, id }
  });
};

export const deleteField  = (fieldId) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      types: [ ADD_FIELD, fieldsDeleteSuccess, FIELDS_FAILURE ],
      method: 'POST',
      endpoint: '/fields/delete',
      payload: { id: fieldId }
    }
  });
};

export const fieldsDeleteSuccess = (data) => (dispatch) => {
  dispatch({ type: 'DELETE_FIELD', payload: data });
};

export const cancelEdit = () => (dispatch) => {
  return dispatch({
    type: EDIT_FIELD,
    payload: null
  });
};

export const actions = {
  updateField,
  addField,
  editField
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_FIELD] : (state, action) =>
    ({ ...state, editingField: action.payload })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =  {
  editingField: null
};
export default function fieldsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
