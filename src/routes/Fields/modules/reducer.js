import { FIELDS_EDIT } from 'constants/api';

const ACTION_HANDLERS = {
  [FIELDS_EDIT] : (state, action) =>
    ({ ...state, editingField: action.payload })
};

const initialState =  {
  editingField: null
};

export default function fieldsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
