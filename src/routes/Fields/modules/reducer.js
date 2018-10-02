import { CALL_API } from 'middleware/api';
import { reset } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------

export const FIELDS_EDIT = 'FIELDS_EDIT';
export const FIELDS_ADD_START = 'FIELDS_ADD_START';
export const FIELDS_ADD_COMPLETE = 'FIELDS_ADD_COMPLETE';
export const FIELDS_ADD_ERROR = 'FIELDS_ADD_ERROR';
export const FIELDS_DELETE_START = 'FIELDS_DELETE_START';
export const FIELDS_DELETE_COMPLETE = 'FIELDS_DELETE_COMPLETE';
export const FIELDS_DELETE_ERROR = 'FIELDS_DELETE_ERROR';
export const FIELDS_UPDATE_START = 'FIELDS_UPDATE_START';
export const FIELDS_UPDATE_COMPLETE = 'FIELDS_UPDATE_COMPLETE';
export const FIELDS_UPDATE_ERROR = 'FIELDS_UPDATE_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

export const updateField = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateFieldsForm.values;
  return dispatch({
    [CALL_API]: {
      types: [ FIELDS_UPDATE_START, fieldsComplete, FIELDS_UPDATE_ERROR ],
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
      types: [ FIELDS_ADD_START, fieldsComplete, FIELDS_ADD_ERROR ],
      method: 'POST',
      endpoint: '/fields/add',
      payload: { ...fieldValues }
    }
  });
};

export const fieldsComplete = (data) => (dispatch, getState) => {
  dispatch(reset('updateFieldsForm'));
  dispatch({ type: FIELDS_ADD_COMPLETE, payload: data.fields });
};

export const editField = ({ type, label, tabName, options, id }) => (dispatch) => {
  return dispatch({
    type: FIELDS_EDIT,
    payload: { type: type.toString(), label, tabName, options, id }
  });
};

export const deleteField  = (fieldId) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      types: [ FIELDS_DELETE_START, FIELDS_DELETE_COMPLETE, FIELDS_DELETE_ERROR ],
      method: 'POST',
      endpoint: '/fields/delete',
      payload: { id: fieldId }
    }
  });
};

export const cancelEdit = () => (dispatch) => {
  return dispatch({
    type: FIELDS_EDIT,
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
  [FIELDS_EDIT] : (state, action) =>
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
