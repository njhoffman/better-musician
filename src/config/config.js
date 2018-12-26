import { defaultsDeep, isFunction } from 'lodash';
import defaultConfig from 'config/defaults';
import userConfig from 'config/user';

const config = defaultsDeep(userConfig, defaultConfig);

const { extension, inspector, monitorProps } = config.dev;
if (__DEV__) {
  config.dev.extension.show = !inspector.show && extension.show
    && isFunction(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
  config.dev.extension.monitorProps = defaultsDeep(extension.monitorProps, monitorProps);
}

export default config;
