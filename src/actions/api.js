import _ from 'lodash';
import { CALL_API } from 'middleware/api';
import { init as initLog } from 'shared/logger';
import * as API from 'constants/api';
import * as UI from 'constants/ui';

const { info, warn } = initLog('api-actions');

export const configureLoad = (endpoints) => ({ type: API.CONFIGURE_LOAD, payload: endpoints });
export const configureStart = () => ({ type: API.CONFIGURE_START });
export const configureComplete = (config) => ({
  type: API.CONFIGURE_COMPLETE,
  payload: config
});

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
      types: [ API.SONGS_FETCH_START, songsFetchComplete, API.SONGS_FETCH_ERROR],
      endpoint: '/songs'
    }
  });
};

export const songsFetchComplete = (response) => (dispatch) => {
  const tables = response.data.tables;
  // info('songsFetchComplete', response);
  info(`songsFetchComplete: ${tables.songs.length} songs and ${tables.artists.length} artists`);

  /* eslint-disable no-multi-spaces */
  dispatch({ type: API.SONGS_FETCH_COMPLETE, payload: response });
  dispatch({ type: API.LOAD_ARTISTS,         payload: tables.artists });
  dispatch({ type: API.LOAD_INSTRUMENTS,     payload: tables.instruments });
  dispatch({ type: API.LOAD_GENRES,          payload: tables.genres });
  dispatch({ type: API.LOAD_FIELDS,          payload: tables.fields });
  dispatch({ type: API.LOAD_SONGS,           payload: tables.songs });
  /* eslint-enable no-multi-spaces */
};

export const updateUser = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateProfileForm
    ? getState().form.updateProfileForm.values
    : getState().form.updateSettingsForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [API.USER_UPDATE_START, userUpdateComplete, userUpdateError],
      method:   'POST',
      endpoint: '/users/update',
      payload:  { ...fieldValues }
    }
  });
};

export const userUpdateComplete = (response) => (dispatch) => {
  info('updateUserComplete', response);
  dispatch({ type: API.USER_UPDATE_COMPLETE, user: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: 'Profile Successfully Updated',
    meta: { variant: 'success' }
  });
  // reloads user attributes
  dispatch({ type: API.AUTHENTICATE_COMPLETE, payload: { user: response } });
};

export const userUpdateError = (response) => (dispatch) => {
  warn('updateUserError', response);
  dispatch({ type: API.USER_UPDATE_ERROR, user: response });
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: response.message ? response.message : response.error ? response.error : 'Unknown Error',
    meta: { variant: 'error', title: 'Profile Update Error' }
  });
  // reloads user attributes
  dispatch({ type: API.AUTHENTICATE_COMPLETE, payload: { user: response } });
};

export const addSong = () => (dispatch, getState) => {
  const fieldValues = getState().form.addSongForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [API.SONGS_ADD_START, songsAddComplete, songsAddError],
      method:   'POST',
      endpoint: '/songs/add',
      payload:  { ...fieldValues }
    }
  });
};

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
      type: UI.MODAL_VAR_ADD_SONG,
      props: { errors: response.errors }
    }
  });
};
