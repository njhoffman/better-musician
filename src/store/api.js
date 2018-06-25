import _ from 'lodash';
import { CALL_API } from 'middleware/api';
import { init as initLog } from 'shared/logger';

const { info } = initLog('api-store');

// ------------------------------------
// Constants
// ------------------------------------

export const LOAD_CONFIG           = 'LOAD_CONFIG';
export const FETCH_SONGS           = 'FETCH_SONGS';
export const SONGS_REQUEST         = 'SONGS_REQUEST';
export const SONGS_SUCCESS         = 'SONGS_SUCCESS';
export const SONGS_FAILURE         = 'SONGS_FAILURE';
export const LOAD_ARTISTS          = 'LOAD_ARTISTS';
export const LOAD_INSTRUMENTS      = 'LOAD_INSTRUMENTS';
export const LOAD_GENRES           = 'LOAD_GENRES';
export const LOAD_SONGS            = 'LOAD_SONGS';
export const LOAD_FIELDS           = 'LOAD_FIELDS';

export const AUTHENTICATE_START    = 'AUTHENTICATE_START';
export const AUTHENTICATE_COMPLETE = 'AUTHENTICATE_COMPLETE';
export const AUTHENTICATE_ERROR    = 'AUTHENTICATE_ERROR';

export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

export const SONGS_ADD = 'SONGS_ADD';
export const SONGS_ADD_SUCCESS = 'SONGS_ADD_SUCCESS';
export const SONGS_ADD_FAILURE = 'SONGS_ADD_FAILURE';

export const EMAIL_SIGN_IN_START       = 'EMAIL_SIGN_IN_START';
export const EMAIL_SIGN_IN_COMPLETE    = 'EMAIL_SIGN_IN_COMPLETE';
export const EMAIL_SIGN_IN_ERROR       = 'EMAIL_SIGN_IN_ERROR';

// ------------------------------------
// Action Creators
// ------------------------------------

export const fetchSongs = ({ dispatch, getState }) => {
  const state = getState();
  if (state.api.initialized.indexOf('songs') !== -1) {
    info('Songs already initialized, skipping');
    return false;
  }
  info('Calling CALL_API');
  return dispatch({
    [CALL_API]: {
      types: [ SONGS_REQUEST, songsSuccess, SONGS_FAILURE ],
      endpoint: '/songs'
    }
  });
};

export const songsSuccess = (response) => (dispatch) => {
  const tables = response.tables;
  // info('fetchSongsSuccess', response);
  info(`fetchSongsSuccess: ${tables.songs.length} songs and ${tables.artists.length} artists`);

  /* eslint-disable no-multi-spaces */
  dispatch({ type: SONGS_SUCCESS,    payload: response });
  dispatch({ type: LOAD_ARTISTS,     payload: tables.artists });
  dispatch({ type: LOAD_INSTRUMENTS, payload: tables.instruments });
  dispatch({ type: LOAD_GENRES,      payload: tables.genres });
  dispatch({ type: LOAD_FIELDS,      payload: tables.fields });
  dispatch({ type: LOAD_SONGS,       payload: tables.songs });
  /* eslint-enable no-multi-spaces */
};

export const updateUser = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateProfileForm
    ? getState().form.updateProfileForm.values
    : getState().form.updateSettingsForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [USER_UPDATE, userUpdateSuccess, USER_UPDATE_FAILURE],
      method:   'POST',
      endpoint: '/users/update',
      payload:  { ...fieldValues }
    }
  });
};

export const userUpdateSuccess = (response) => (dispatch) => {
  info('updateUserSuccess', response);
  dispatch({ type: USER_UPDATE_SUCCESS, user: response });
  dispatch({ type: 'UI_SHOW_SNACKBAR', meta: { message: 'Profile Updated' } });
  // reloads user attributes
  dispatch({ type: AUTHENTICATE_COMPLETE, user: response });
};

export const addSong = () => (dispatch, getState) => {
  const fieldValues = getState().form.addSongForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [SONGS_ADD, songsAddSuccess, songsAddFailure],
      method:   'POST',
      endpoint: '/songs/add',
      payload:  { ...fieldValues }
    }
  });
};

export const songsAddSuccess = (response) => (dispatch) => {
  dispatch({ type: SONGS_ADD_SUCCESS, user: response });
  dispatch({ type: 'UI_SHOW_SNACKBAR', meta: { message: 'Song Added' } });
};

export const songsAddFailure = (response) => (dispatch) => {
  dispatch({ type: SONGS_ADD_FAILURE, user: response });
  dispatch({ type: 'UI_SHOW_SNACKBAR', meta: { message: 'Validation Error: Song Not Added' } });
  dispatch({ type: 'UI_UPDATE_MODAL', meta: { type: 'MODAL_ADD_SONG', props: { errors: response.errors } } });
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {

  [AUTHENTICATE_START] : (state) => ({
    ...state,
    loading: true
  }),
  [AUTHENTICATE_ERROR] : (state) => ({
    ...state,
    loading: false
  }),
  [AUTHENTICATE_COMPLETE] : (state) => ({
    ...state,
    loading: false,
    initialized: state.initialized.indexOf('user') === -1 ? state.initialized.concat('user') : state.initialized
  }),

  [LOAD_CONFIG] : (state, { payload: { api } }) => ({
    ...state,
    endpoints: _.mapValues(api.endpoints, ep => ({
      loading: false,
      errors: false,
      success: false
    }))
  }),

  [EMAIL_SIGN_IN_START] : (state) => ({
    ...state,
    loading: true,
    endpoints: { ...state.endpoints, login: { ...state.endpoints.login, loading: true } }
  }),
  [EMAIL_SIGN_IN_COMPLETE] : (state) => ({
    ...state,
    loading: false,
    endpoints: { ...state.endpoints, login: { ...state.endpoints.login, loading: false, success: true, errors: [] } }
  }),
  [EMAIL_SIGN_IN_ERROR] : (state, { errors }) => ({
    ...state,
    loading: false ,
    endpoints: { ...state.endpoints, login: { ...state.endpoints.login, loading: false, success: false, errors } }
  }),

  [SONGS_REQUEST] : (state) => ({ ...state, loading: true }),
  [SONGS_SUCCESS] : (state) =>
    ({ ...state,
      loading: false,
      initialized: state.initialized.indexOf('songs') === -1 ? state.initialized.concat('songs') : state.initialized }),
  [USER_UPDATE] : (state) => ({ ...state, loading: true }),
  [USER_UPDATE_SUCCESS] : (state) => ({ ...state, loading: false }),
  [USER_UPDATE_FAILURE] : (state) => ({ ...state, loading: false }),
  [SONGS_ADD] : (state) => ({ ...state, loading: true }),
  [SONGS_ADD_SUCCESS] : (state) => ({ ...state, loading: false }),
  [SONGS_ADD_FAILURE] : (state) => ({ ...state, loading: false })
};

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  loading: false,
  initialized: [],
  errors: []
};

export default function apiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
