import { commonInitView } from 'store/common';
import { INIT_VIEW_COMPLETE } from 'constants/ui';

import * as V from 'constants/views';

const ACTION_HANDLERS = {
  [V.FIELDS_EDIT_FIELD] : (state, action) =>
    ({ ...state, editingFieldId: action.payload }),

  [V.FIELDS_PREVIEW_FIELD] : (state, action) =>
    ({ ...state, previewField: action.payload }),

  [V.FIELDS_EDIT_TAB] : (state, action) =>
    ({ ...state, editingTab: action.payload }),

  [V.FIELDS_SELECT_TAB] : (state, action) =>
    ({ ...state, selectedTab: action.payload }),

  [V.FIELDS_DESELECT_TAB] : (state, action) =>
    ({ ...state, selectedTab: action.payload }),

  [INIT_VIEW_COMPLETE] : (state, action) => ({
    ...state,
    ...commonInitView(action)
  })
};

const initialState =  {
  previewFieldId : null,
  editingFieldId : null,
  editingTab     : null,
  selectedTab    : null
};

export default function fieldsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
