import * as A from 'constants/auth';
import { configure as authConfigure } from 'actions/auth/configure';

export const loadAppConfig = ({ dispatch, getState }) => {
  return Promise.resolve(dispatch({
    type: A.LOAD_CONFIG,
    payload: getState().config.endpoints.default
  }));
};

export const loadAuthConfig = ({ dispatch, getState }) =>
  dispatch(
    authConfigure(getState().config.endpoints, getState().config.settings)
  );
