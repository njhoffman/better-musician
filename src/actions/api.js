import _ from 'lodash';
import { CALL_API } from 'middleware/api';
import { init as initLog } from 'shared/logger';
import { reset, initialize } from 'redux-form';
import * as ORM from 'constants/orm';
import * as CONF from 'constants/config';
import * as API from 'constants/api';
import * as UI from 'constants/ui';
// import { setCurrentSong } from 'routes/Songs/modules/reducer';

const { info, warn } = initLog('api-actions');

export const configureLoad = (payload) => ({
  type: CONF.CONFIGURE_LOAD, payload
});

export const configureStart = () => ({ type: CONF.CONFIGURE_START });
export const configureComplete = (config) => ({
  type: CONF.CONFIGURE_COMPLETE,
  payload: config
});

export const getApiVersion = (dispatch) =>
  dispatch({
    [CALL_API]: {
      types:    [API.GET_VERSION_START, API.GET_VERSION_COMPLETE, API.GET_VERSION_ERROR],
      method:   'POST',
      endpoint: `${__API_URL__}/version`
    }
  });

/* songs */

export const songsDeleteComplete = ({ changed }) => (dispatch) => {
  const deletedSong = changed && changed[0] ? changed[0].old : {};
  dispatch({ type: API.SONGS_DELETE_COMPLETE, payload: deletedSong.id });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: `${deletedSong.title} deleted.`,
    meta: { variant: 'success', title: 'Song Deleted' }
  });
};

export const songsDeleteError = ({ status, errors }) => (dispatch) => {
  dispatch({ type: API.SONGS_ADD_ERROR, errors });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    meta: { variant: 'error', title: 'Song Deletion Error' },
    payload: `${JSON.stringify(errors)}`
  });
};

export const deleteSong = (songId) => (dispatch, getState) =>
  dispatch({
    [CALL_API]: {
      types:    [API.SONGS_DELETE_START, songsDeleteComplete, songsDeleteError],
      method:   'POST',
      endpoint: `${__API_URL__}/songs/delete`,
      payload:  { id: songId }
    }
  });

export const songsAddComplete = ({ records, changed }) => (dispatch) => {
  dispatch({ type: UI.MODAL_HIDE, meta: { type: UI.SONG_MODAL } });
  dispatch({ type: API.SONGS_ADD_COMPLETE, payload: records[0] });
  dispatch({ type: ORM.ADD_SONG, payload: records[0] });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: `"${records[0].title}" added.`,
    meta: { variant: 'success', title: 'Song Added' }
  });
};

export const songsAddError = (response) => (dispatch) => {
  dispatch({ type: API.SONGS_ADD_ERROR, user: response });

  dispatch({
    type: UI.SNACKBAR_SHOW,
    meta: { variant: 'error', title: 'Song Add Error' },
    payload: `${JSON.stringify(response.errors || response.error)}`
  });

  dispatch({
    type: UI.MODAL_UPDATE,
    meta: {
      type: UI.SONG_MODAL,
      props: { errors: response.errors || response.error }
    }
  });
};

export const addSong = (changedFields) => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types:    [API.SONGS_ADD_START, songsAddComplete, songsAddError],
      method:   'POST',
      endpoint: `${__API_URL__}/songs/add`,
      payload:  { ...changedFields }
    }
  });
};

export const songsUpdateComplete = ({ records, changed }) => (dispatch) => {
  const changedLength = _.reject(changed[0].delta, ['path[0]', 'updatedAt']).length;
  dispatch({ type: UI.MODAL_HIDE, meta: { type: UI.SONG_MODAL } });
  dispatch({ type: API.SONGS_UPDATE_COMPLETE, payload: records[0] });
  dispatch({ type: ORM.UPDATE_SONG, payload: records[0] });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: `Song updated with ${changedLength} fields.`,
    meta: { variant: 'success', title: 'Song Updated' }
  });
};

export const songsUpdateError = (response) => (dispatch) => {
  dispatch({ type: API.SONGS_UPDATE_ERROR, user: response });

  dispatch({
    type: UI.SNACKBAR_SHOW,
    meta: { variant: 'error', title: 'Song Update Error' },
    payload: `${JSON.stringify(response.errors || response.error)}`
  });

  dispatch({
    type: UI.MODAL_UPDATE,
    meta: {
      type: UI.SONG_MODAL,
      props: { errors: response.errors || response.error }
    }
  });
};

export const updateSong = (changedFields, songId) => (dispatch, getState) => (
  dispatch({
    [CALL_API]: {
      types:    [API.SONGS_UPDATE_START, songsUpdateComplete, songsUpdateError],
      method:   'POST',
      endpoint: `${__API_URL__}/songs/update`,
      payload:  { ...changedFields, id: songId }
    }
  })
);

export const songsFetchComplete = (data) => (dispatch) => {
  // TODO: figure out a better way to handle loading shallow ORM data like this
  const tables = data.records[0];
  info(`songsFetchComplete: ${tables.songs.length} songs and ${tables.artists.length} artists`);

  /* eslint-disable no-multi-spaces */
  dispatch({ type: API.SONGS_FETCH_COMPLETE, payload: tables });
  dispatch({ type: ORM.LOAD_ARTISTS,         payload: tables.artists });
  dispatch({ type: ORM.LOAD_INSTRUMENTS,     payload: tables.instruments });
  dispatch({ type: ORM.LOAD_GENRES,          payload: tables.genres });
  dispatch({ type: ORM.LOAD_FIELDS,          payload: tables.fields });
  dispatch({ type: ORM.LOAD_FIELD_TABS,      payload: tables.fieldTabs });
  dispatch({ type: ORM.LOAD_SONGS,           payload: tables.songs });
  /* eslint-enable no-multi-spaces */
};

export const fetchSongs = ({ dispatch }) => (
  // TODO: make this better dumbass
  // const state = getState();
  // if (_.has(state, 'orm.Song.items') && _.get(state, 'orm.Song.items').length > 0) {
  //   info('Songs already initialized, skipping');
  //   return false;
  // }
  dispatch({
    [CALL_API]: {
      types: [API.SONGS_FETCH_START, songsFetchComplete, API.SONGS_FETCH_ERROR],
      endpoint: `${__API_URL__}/songs`
    }
  })
);

export const artistsFetchComplete = ({ tables }) => (dispatch) => {
  info(`artistsFetchComplete: ${tables.artists.length} artists`);
  dispatch({ type: ORM.LOAD_ARTISTS, payload: tables.artists });
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

export const profileUpdateComplete = ({ records, changed }) => (dispatch) => {
  const changedLength = _.reject(changed[0].delta, ['path[0]', 'updatedAt']).length;
  dispatch({ type: API.PROFILE_UPDATE_COMPLETE, payload: records[0] });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: `User profile updated with ${changedLength} fields.`,
    meta: { variant: 'success', title: 'Profile Updated' }
  });
  dispatch(initialize('profile', records[0]));
};

export const profileUpdateError = (response) => (dispatch) => {
  warn('updateProfile Error', response);
  dispatch({ type: API.PROFILE_UPDATE_ERROR, user: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: `${JSON.stringify(response.errors || response.error)}`,
    meta: { variant: 'error', title: 'Profile Update Error' }
  });
};

export const updateProfile = (changedFields, userId) => (dispatch, getState) =>
  dispatch({
    [CALL_API]: {
      types:    [API.PROFILE_UPDATE_START, profileUpdateComplete, profileUpdateError],
      method:   'POST',
      endpoint: `${__API_URL__}/users/update`,
      payload: { ...changedFields, id: userId }
    }
  });

/* settings */

export const settingsUpdateComplete = ({ records, changed }) => (dispatch) => {
  const changedLength = _.reject(changed[0].delta, ['path[0]', 'updatedAt']).length;
  dispatch({ type: API.SETTINGS_UPDATE_COMPLETE, payload: records[0] });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: `User settings updated with ${changedLength} fields.`,
    meta: { variant: 'success', title: 'Settings Updated' }
  });
  dispatch(initialize('settings', records[0]));
};

export const settingsUpdateError = (response) => (dispatch) => {
  warn('updateSettingsError', response);
  dispatch({ type: API.SETTINGS_UPDATE_ERROR, user: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: `${JSON.stringify(response.errors || response.error)}`,
    meta: { variant: 'error', title: 'Profile Update Error' }
  });
};

export const updateSettings = () => (dispatch, getState) => {
  const fieldValues = getState().form.settings.values;
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
export const fieldUpdateComplete = ({ records, changed }) => (dispatch, getState) => {
  dispatch({ type: API.FIELDS_UPDATE_COMPLETE, payload: records[0] });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Field Successfully Updated',
    meta: { variant: 'success' }
  });
};

export const updateField = () => (dispatch, getState) => {
  const fieldValues = getState().form.fields.values;
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
  dispatch(reset('fields'));
  dispatch({ type: API.FIELDS_ADD_COMPLETE, payload: data.fields });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Field Successfully Added',
    meta: { variant: 'success' }
  });
};

export const addField = () => (dispatch, getState) => {
  const fieldValues = getState().form.fields.values;
  return dispatch({
    [CALL_API]: {
      types: [API.FIELDS_ADD_START, fieldAddComplete, API.FIELDS_ADD_ERROR],
      method: 'POST',
      endpoint: `${__API_URL__}/fields/add`,
      payload: { ...fieldValues }
    }
  });
};

export const fieldsDeleteComplete = ({ changed }) => (dispatch, getState) => {
  dispatch(reset('fields'));
  const deletedField = changed && changed[0] ? changed[0].old : {};
  dispatch({ type: API.FIELDS_ADD_COMPLETE, payload: deletedField });
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
