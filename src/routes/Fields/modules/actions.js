import _ from 'lodash';
import { uiShowModal, uiUpdateModal } from 'actions/ui';
import * as V from 'constants/views';
import * as UI from 'constants/ui';

export const editField = (payload) => (dispatch) => {
  dispatch({
    type: V.FIELDS_EDIT_FIELD,
    payload
  });
};

export const previewField = (payload) => (dispatch) => {
  dispatch({
    type: V.FIELDS_PREVIEW_FIELD,
    payload
  });
};
export const showPreviewFieldModal = (fieldId) => (dispatch) => {
  dispatch(previewField(fieldId));
  dispatch(uiShowModal(
    UI.PREVIEW_FIELD_MODAL,
    UI.MODAL_VARIANT_EDIT,
    { id: fieldId }
  ));
};

export const showEditFieldModal = (fieldId) => (dispatch) => {
  dispatch(editField(fieldId));
  dispatch(uiShowModal(
    UI.EDIT_FIELD_MODAL,
    UI.MODAL_VARIANT_EDIT,
    { id: fieldId }
  ));
};

export const changeViewMode = (viewMode) => (dispatch) => {
  dispatch(uiUpdateModal(UI.PREVIEW_FIELD_MODAL, { viewMode }));
};

export const editTab = (payload) => (dispatch) =>
  dispatch({
    type: V.FIELDS_EDIT_TAB,
    payload
  });

export const selectTab = (selectedTab) => (dispatch) =>
  dispatch({
    type: (_.has(selectedTab, 'id') ? V.FIELDS_DESELECT_TAB : V.FIELDS_SELECT_TAB),
    payload: selectedTab
  });


export const cancelTabEdit = () => editTab(null);
export const cancelFieldEdit = () => editField(null);
