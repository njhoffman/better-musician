import { defaultsDeep, isFunction } from 'lodash';
import defaultConfig from 'config/defaults';
import userConfig from 'config/user';

const config = defaultsDeep(userConfig, defaultConfig);

if (__DEV__) {
  config.dev.showExtension = !config.dev.showInspector
    && config.dev.showExtension
    && isFunction(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
  config.dev.extensionOptions.monitorProps = defaultsDeep(config.dev.extensionOptions.monitorProps, config.dev.monitorProps);
}

export default config;
