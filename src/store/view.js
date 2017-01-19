export const initView = ({ dispatch }, viewName) => {
  return dispatch({ type: "INIT_VIEW", payload: { currentView: viewName } });
}

export default initView;
