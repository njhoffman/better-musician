import _ from 'lodash';
import { CALL_API } from 'middleware/api';
import { init as initLog } from 'shared/logger';
import { reset } from 'redux-form';
import * as API from 'constants/api';
import * as UI from 'constants/ui';

const { info, warn } = initLog('api-actions');

export const configureLoad = (payload) => ({
  type: API.CONFIGURE_LOAD, payload
});

export const configureStart = () => ({ type: API.CONFIGURE_START });
export const configureComplete = (config) => ({
  type: API.CONFIGURE_COMPLETE,
  payload: config
});

/* songs */

export const songsAddComplete = (response) => (dispatch) => {
  dispatch({ type: API.SONGS_ADD_COMPLETE, user: response });
  dispatch({ type: UI.SNACKBAR_SHOW, payload: 'Song Added', meta: { variant: 'success' } });
};

export const songsAddError = (response) => (dispatch) => {
  dispatch({ type: API.SONGS_ADD_ERROR, user: response });

  dispatch({
    type: UI.SNACKBAR_SHOW,
    meta: { variant: 'warnining' },
    payload: 'Validation Error: Song Not Added'
  });

  dispatch({
    type: UI.MODAL_UPDATE,
    meta: {
      type: UI.SONG_MODAL,
      props: { errors: response.errors }
    }
  });
};

export const addSong = () => (dispatch, getState) => {
  const fieldValues = getState().form.songForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [API.SONGS_ADD_START, songsAddComplete, songsAddError],
      method:   'POST',
      endpoint: `${__API_URL__}/songs/add`,
      payload:  { ...fieldValues }
    }
  });
};


export const songsFetchComplete = (tables) => (dispatch) => {
  // info('songsFetchComplete', response);
  info(`songsFetchComplete: ${tables.songs.length} songs and ${tables.artists.length} artists`);

  /* eslint-disable no-multi-spaces */
  dispatch({ type: API.SONGS_FETCH_COMPLETE, payload: tables });
  dispatch({ type: API.LOAD_ARTISTS,         payload: tables.artists });
  dispatch({ type: API.LOAD_INSTRUMENTS,     payload: tables.instruments });
  dispatch({ type: API.LOAD_GENRES,          payload: tables.genres });
  dispatch({ type: API.LOAD_FIELDS,          payload: tables.fields });
  dispatch({ type: API.LOAD_SONGS,           payload: tables.songs });
  /* eslint-enable no-multi-spaces */
};

export const fetchSongs = ({ dispatch, getState }) => {
  // TODO: make this better dumbass
  const state = getState();
  if (_.has(state, 'orm.Song.items') && _.get(state, 'orm.Song.items').length > 0) {
    info('Songs already initialized, skipping');
    return false;
  }
  info('Calling CALL_API');
  return dispatch({
    [CALL_API]: {
      types: [API.SONGS_FETCH_START, songsFetchComplete, API.SONGS_FETCH_ERROR],
      endpoint: `${__API_URL__}/songs`
    }
  });
};

export const artistsFetchComplete = ({ tables }) => (dispatch) => {
  info(`artistsFetchComplete: ${tables.artists.length} artists`);
  dispatch({ type: API.LOAD_ARTISTS, payload: tables.artists });
};

export const fetchArtists = ({ dispatch, getState }) => {
  // TODO: make this better dumbass
  info('Calling CALL_API');
  return dispatch({
    [CALL_API]: {
      types: [API.ARTISTS_FETCH_START, artistsFetchComplete, API.ARTISTS_FETCH_ERROR],
      endpoint: `${__API_URL__}/artists`
    }
  });
};

/* profile */

export const userUpdateComplete = (response) => (dispatch) => {
  dispatch({ type: API.USER_UPDATE_COMPLETE, payload: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Profile Successfully Updated',
    meta: { variant: 'success' }
  });
};

export const userUpdateError = (response) => (dispatch) => {
  warn('updateUserError', response);

  dispatch({ type: API.USER_UPDATE_ERROR, user: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: response.message || response.error || 'Unknown Error',
    meta: { variant: 'error', title: 'Profile Update Error' }
  });
};

export const updateUser = () => (dispatch, getState) => {
  const fieldValues = getState().form.profile
    ? getState().form.profile.values
    : getState().form.updateSettingsForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [API.USER_UPDATE_START, userUpdateComplete, userUpdateError],
      method:   'POST',
      endpoint: `${__API_URL__}/users/update`,
      payload:  { ...fieldValues }
    }
  });
};

/* settings */

export const settingsUpdateComplete = (response) => (dispatch) => {
  dispatch({ type: API.SETTINGS_UPDATE_COMPLETE, payload: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Profile Successfully Updated',
    meta: { variant: 'success' }
  });
};

export const settingsUpdateError = (response) => (dispatch) => {
  warn('updateSettingsError', response);

  dispatch({ type: API.SETTINGS_UPDATE_ERROR, user: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: response.message || response.error || 'Unknown Error',
    meta: { variant: 'error', title: 'Profile Update Error' }
  });
};

export const updateSettings = () => (dispatch, getState) => {
  const fieldValues = getState().form.profile
    ? getState().form.profile.values
    : getState().form.updateSettingsForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [API.SETTINGS_UPDATE_START, settingsUpdateComplete, settingsUpdateError],
      method:   'POST',
      endpoint: `${__API_URL__}/users/update`,
      payload:  { ...fieldValues }
    }
  });
};

/* fields */
export const cancelEdit = () => (dispatch) =>
  dispatch({
    type: API.FIELDS_EDIT,
    payload: null
  });

export const fieldUpdateComplete = (data) => (dispatch, getState) => {
  dispatch(cancelEdit());
  dispatch({ type: API.FIELDS_UPDATE_COMPLETE, payload: data });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Field Successfully Updated',
    meta: { variant: 'success' }
  });
};

export const updateField = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateFieldsForm.values;
  return dispatch({
    [CALL_API]: {
      types: [API.FIELDS_UPDATE_START, fieldUpdateComplete, API.FIELDS_UPDATE_ERROR],
      method: 'POST',
      endpoint: `${__API_URL__}/fields/update`,
      payload: { ...fieldValues }
    }
  });
};

export const fieldAddComplete = (data) => (dispatch, getState) => {
  dispatch(reset('updateFieldsForm'));
  dispatch({ type: API.FIELDS_ADD_COMPLETE, payload: data.fields });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Field Successfully Added',
    meta: { variant: 'success' }
  });
};

export const addField = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateFieldsForm.values;
  return dispatch({
    [CALL_API]: {
      types: [API.FIELDS_ADD_START, fieldAddComplete, API.FIELDS_ADD_ERROR],
      method: 'POST',
      endpoint: `${__API_URL__}/fields/add`,
      payload: { ...fieldValues }
    }
  });
};

export const fieldsDeleteComplete = (data) => (dispatch, getState) => {
  dispatch(reset('updateFieldsForm'));
  dispatch({ type: API.FIELDS_ADD_COMPLETE, payload: data.fields });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Field Successfully Deleted',
    meta: { variant: 'success' }
  });
};

export const deleteField = (fieldId) => (dispatch, getState) =>
  dispatch({
    [CALL_API]: {
      types: [API.FIELDS_DELETE_START, API.FIELDS_DELETE_COMPLETE, API.FIELDS_DELETE_ERROR],
      method: 'POST',
      endpoint: `${__API_URL__}/fields/delete`,
      payload: { id: fieldId }
    }
  });

export const editField = ({ type, label, tabName, options, id }) => (dispatch) =>
  dispatch({
    type: API.FIELDS_EDIT,
    payload: { type: type.toString(), label, tabName, options, id }
  });
