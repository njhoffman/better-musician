import _ from 'lodash';
import * as A from 'constants/auth';
import { defaultConfig } from 'store/config';

export const loadConfig = (config) => (dispatch) => {
  return Promise.resolve(dispatch({
    type: A.LOAD_CONFIG,
    payload: _.defaultsDeep(config, defaultConfig)
  }));
};
