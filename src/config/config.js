import { defaultsDeep, isFunction } from 'lodash';
import defaultConfig from 'config/defaults';
import userConfig from 'config/user';

const config = defaultsDeep(userConfig, defaultConfig);

const { showExtension, showInspector, extensionOptions, monitorProps } = config.dev;
if (__DEV__) {
  config.dev.showExtension = !showInspector && showExtension
    && isFunction(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
  config.dev.extensionOptions.monitorProps = defaultsDeep(extensionOptions.monitorProps, monitorProps);
}

export default config;
