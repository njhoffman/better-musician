// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE';
export const INIT_VIEW       = 'INIT_VIEW';

// ------------------------------------
// Actions Creators
// ------------------------------------
export function locationChange (location = '/') {
  return {
    type    : LOCATION_CHANGE,
    payload : location
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => (nextLocation) => {
  return dispatch(locationChange(nextLocation));
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [LOCATION_CHANGE] : (state, action) => ({...state, ...action.payload }),
  [INIT_VIEW] : (state, action) => ({...state, ...action.payload })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

export default function locationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
