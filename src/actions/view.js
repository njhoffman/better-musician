import { fetchSongs } from 'store/api';

export const initView = ({ dispatch, getState }, viewName) => {
  // TODO: have this as upstream route property
  if (['songs', 'fields', 'settings', 'stats'].indexOf(viewName.toLowerCase()) !== -1) {
    fetchSongs({ dispatch, getState });
  }
  return dispatch({ type: 'INIT_VIEW', payload: { currentView: viewName } });
};

export default initView;
