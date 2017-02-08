import { CALL_API } from 'middleware/api';

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_SONGS      = 'FETCH_SONGS';
export const SONGS_REQUEST    = 'SONGS_REQUEST';
export const SONGS_SUCCESS    = 'SONGS_SUCCESS';
export const SONGS_FAILURE    = 'SONGS_FAILURE';
export const LOAD_ARTISTS     = 'LOAD_ARTISTS';
export const LOAD_INSTRUMENTS = 'LOAD_INSTRUMENTS';
export const LOAD_GENRES      = 'LOAD_GENRES';
export const LOAD_SONGS       = 'LOAD_SONGS';
export const LOAD_FIELDS      = 'LOAD_FIELDS';

export const UPDATE_USER  = 'USER_UPDATE';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

// ------------------------------------
// Action Creators
// ------------------------------------

export const fetchSongs = ({ dispatch, getState, nextLocation }) => {
  const state = getState();
  if (state.api.initialized.indexOf('songs') !== -1) {
    return false;
  }
  return dispatch({
    [CALL_API]: {
      types: [ SONGS_REQUEST, songsSuccess, SONGS_FAILURE ],
      endpoint: '/songs'
    }
  });
};

export const songsSuccess = (response) => (dispatch) => {
  const tables = response.tables;

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
      types:    [UPDATE_USER, userSuccess, USER_FAILURE],
      method:   'POST',
      endpoint: '/users/update',
      payload:  { ...fieldValues }
    }
  });
};

export const userSuccess = (response) => (dispatch) => {
  console.info('userSuccess');
  dispatch({ type: USER_SUCCESS, user: response });
  dispatch({ type: 'UI_SHOW_SNACKBAR', meta: { message: 'Profile Updated' } });
  // reloads user attributes
  dispatch({ type: 'AUTHENTICATE_COMPLETE', user: response });
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  ['AUTHENTICATE_START'] : (state) =>
    ({ ...state, isFetching: true }),
  ['AUTHENTICATE_COMPLETE'] : (state) =>
    ({ ...state,
      isFetching: false,
      initialized: state.initialized.indexOf('user') === -1 ? state.initialized.concat('user') : state.initialized
    }),
  [SONGS_REQUEST] : (state) => ({ ...state, isFetching: true }),
  [SONGS_SUCCESS] : (state) =>
    ({ ...state,
      isFetching: false,
      initialized: state.initialized.indexOf('songs') === -1 ? state.initialized.concat('songs') : state.initialized }),
  [UPDATE_USER] : (state) => ({ ...state, isFetching: true })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  initialized: []
};

export default function apiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
