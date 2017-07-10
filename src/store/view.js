import { fetchSongs } from 'store/api';

export const initView = ({ dispatch, getState }, viewName) => {
  fetchSongs({ dispatch, getState });
  return dispatch({ type: 'INIT_VIEW', payload: { currentView: viewName } });
};

export default initView;
