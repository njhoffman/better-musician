import { fetchSongs } from 'store/api';

export const initView = ({ dispatch, getState }, viewName) => {
  // TODO: make this trigger only on AUTHENTICATE_COMPLETE
  fetchSongs({ dispatch, getState });
  return dispatch({ type: 'INIT_VIEW', payload: { currentView: viewName } });
};

export default initView;
