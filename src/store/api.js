import _ from 'lodash';
import { CALL_API } from 'middleware/api';
import { init as initLog } from 'shared/logger';


const { info, warn } = initLog('api-store');

// ------------------------------------
// Constants
// ------------------------------------

export const CONFIGURE_LOAD         = 'CONFIGURE_LOAD';
export const SONGS_FETCH_START      = 'SONGS_FETCH_START';
export const SONGS_FETCH_COMPLETE   = 'SONGS_FETCH_COMPLETE';
export const SONGS_FETCH_ERROR      = 'SONGS_FETCH_ERROR';
export const LOAD_ARTISTS           = 'LOAD_ARTISTS';
export const LOAD_INSTRUMENTS       = 'LOAD_INSTRUMENTS';
export const LOAD_GENRES            = 'LOAD_GENRES';
export const LOAD_SONGS             = 'LOAD_SONGS';
export const LOAD_FIELDS            = 'LOAD_FIELDS';

export const AUTHENTICATE_START     = 'AUTHENTICATE_START';
export const AUTHENTICATE_COMPLETE  = 'AUTHENTICATE_COMPLETE';
export const AUTHENTICATE_ERROR     = 'AUTHENTICATE_ERROR';

export const USER_UPDATE_START      = 'USER_UPDATE_START';
export const USER_UPDATE_COMPLETE   = 'USER_UPDATE_COMPLETE';
export const USER_UPDATE_ERROR      = 'USER_UPDATE_ERROR';

export const SONGS_ADD_START        = 'SONGS_ADD_START';
export const SONGS_ADD_COMPLETE     = 'SONGS_ADD_COMPLETE';
export const SONGS_ADD_ERROR        = 'SONGS_ADD_ERROR';

export const EMAIL_SIGN_IN_START    = 'EMAIL_SIGN_IN_START';
export const EMAIL_SIGN_IN_COMPLETE = 'EMAIL_SIGN_IN_COMPLETE';
export const EMAIL_SIGN_IN_ERROR    = 'EMAIL_SIGN_IN_ERROR';

// ------------------------------------
// Action Creators
// ------------------------------------

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
      types: [ SONGS_FETCH_START, songsFetchComplete, SONGS_FETCH_ERROR],
      endpoint: '/songs'
    }
  });
};

export const songsFetchComplete = (response) => (dispatch) => {
  const tables = response.data.tables;
  // info('songsFetchComplete', response);
  info(`songsFetchComplete: ${tables.songs.length} songs and ${tables.artists.length} artists`);

  /* eslint-disable no-multi-spaces */
  dispatch({ type: SONGS_FETCH_COMPLETE, payload: response });
  dispatch({ type: LOAD_ARTISTS,         payload: tables.artists });
  dispatch({ type: LOAD_INSTRUMENTS,     payload: tables.instruments });
  dispatch({ type: LOAD_GENRES,          payload: tables.genres });
  dispatch({ type: LOAD_FIELDS,          payload: tables.fields });
  dispatch({ type: LOAD_SONGS,           payload: tables.songs });
  /* eslint-enable no-multi-spaces */
};

export const updateUser = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateProfileForm
    ? getState().form.updateProfileForm.values
    : getState().form.updateSettingsForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [USER_UPDATE_START, userUpdateComplete, userUpdateError],
      method:   'POST',
      endpoint: '/users/update',
      payload:  { ...fieldValues }
    }
  });
};

export const userUpdateComplete = (response) => (dispatch) => {
  info('updateUserComplete', response);
  dispatch({ type: USER_UPDATE_COMPLETE, user: response });
  dispatch({
    type: 'UI_SNACKBAR_QUEUE',
    payload: 'Profile Successfully Updated',
    meta: { variant: 'success' }
  });
  // reloads user attributes
  dispatch({ type: AUTHENTICATE_COMPLETE, payload: { user: response } });
};

export const userUpdateError = (response) => (dispatch) => {
  warn('updateUserERror', response);
  dispatch({ type: USER_UPDATE_ERROR, user: response });
  dispatch({
    type: 'UI_SNACKBAR_QUEUE',
    payload: response.message ? response.message : response.error ? response.error : 'Unknown Error',
    meta: { variant: 'error', title: 'Profile Update Error' }
  });
  // reloads user attributes
  dispatch({ type: AUTHENTICATE_COMPLETE, payload: { user: response } });
};

export const addSong = () => (dispatch, getState) => {
  const fieldValues = getState().form.addSongForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [SONGS_ADD_START, songsAddComplete, songsAddError],
      method:   'POST',
      endpoint: '/songs/add',
      payload:  { ...fieldValues }
    }
  });
};

export const songsAddComplete = (response) => (dispatch) => {
  dispatch({ type: SONGS_ADD_COMPLETE, user: response });
  dispatch({ type: 'UI_SNACKBAR_QUEUE', payload: 'Song Added', meta: { variant: 'success' } });
};

export const songsAddError = (response) => (dispatch) => {
  dispatch({ type: SONGS_ADD_ERROR, user: response });
  dispatch({ type: 'UI_SNACKBAR_QUEUE', meta: { variant: 'warnining' }, payload: 'Validation Error: Song Not Added' });
  dispatch({ type: 'UI_UPDATE_MODAL', meta: { type: 'MODAL_ADD_SONG', props: { errors: response.errors } } });
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const loadApiEndpoints = (endpoints, level) => {
  // TODO: make api endpoint extension and nesting recursive
  const apiEndpoints = endpoints.default;
  if (level) {
    if (apiEndpoints[level].extends) {
      _.merge(apiEndpoints, endpoints[endpoints[level].extends]);
    }
    _.merge(apiEndpoints, endpoints[level]);
  }

  const results = _.mapValues(apiEndpoints, ep1 => {
    // apiURL
    if (_.isString(ep1)) {
      return ep1;
    }
    return _.mapValues(ep1, ep2 => {
      // first order route
      if (_.isString(ep2)) {
       return {
          loading: false,
          errors: false,
          success: false
        };
      }
      return _.mapValues(ep2, () => ({
        loading: false,
        errors: false,
        success: false
      }));
    });
  });
  return results;
};

const ACTION_HANDLERS = {

  [CONFIGURE_LOAD] : (state, { payload }) => ({
    ...state,
    ...loadApiEndpoints(payload)
  }),

  [EMAIL_SIGN_IN_START] : (state) => ({
    ...state,
    auth: {
      ...state.auth,
      login: { loading: true, success: false, errors: [] }
    }
  }),

  [EMAIL_SIGN_IN_COMPLETE] : (state) => ({
    ...state,
    auth: {
      ...state.auth,
      login: { loading: false, success: true, errors: [] }
    }
  }),

  [EMAIL_SIGN_IN_ERROR] : (state, { payload: { errors } }) => ({
    ...state,
    auth: {
      ...state.auth,
      login: { ...state.auth.login, loading: false, success: false, errors }
    }
  }),

  // [SONGS_FETCH_START] : (state) => ({ ...state, loading: true }),
  // [SONGS_FETCH_COMPLETE] : (state) => ({
  //   ...state,
  //   loading: false,
  //   initialized: state.initialized.indexOf('songs') === -1 ? state.initialized.concat('songs') : state.initialized
  // }),
  // [USER_UPDATE_START] : (state) => ({ ...state, loading: true }),
  // [USER_UPDATE_COMPLETE] : (state) => ({ ...state, loading: false }),
  // [USER_UPDATE_ERROR] : (state) => ({ ...state, loading: false }),
  // [SONGS_ADD_START] : (state) => ({ ...state, loading: true }),
  // [SONGS_ADD_COMPLETE] : (state) => ({ ...state, loading: false }),
  // [SONGS_ADD_ERROR] : (state) => ({ ...state, loading: false })
};

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = { };

export default function apiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
