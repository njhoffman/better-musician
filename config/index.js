/* eslint key-spacing:0 spaced-comment:0 */
const _ = require('lodash');
const path = require('path');
const { argv } = require('yargs');
const ip = require('ip');

const { name, version } = require('../package.json');
const environments = require('./environments.js');
const configWebpack = require('./webpack');
const initLogger = require('../shared/logger/terminal');

const config = {
  base  : path.resolve(__dirname, '..'),
  env : process.env.NODE_ENV || 'development',
  envFlag: process.env.NODE_ENV_FLAG || '',

  // should go in logger config
  showNodeModulesBuild: false,
  showAppModulesBuild: true,

  server: {
    host: process.env.HOST || ip.address(), // use string 'localhost' to prevent exposure on local network
    port: process.env.PORT || 3000
  },

  api: {
    host   : process.env.API_HOST || ip.address(),
    port   : process.env.API_PORT || 3001
  },

  paths: {
    client : 'src',
    dist   : 'dist',
    public : 'public',
    server : 'server',
    test   : 'tests'
  },

  test: {
    coverageReporters : [
      { type : 'text-summary' },
      { type : 'lcov', dir : 'coverage' }
    ]
  }
};

const base = (...args) => {
  const baseArgs = [config.base].concat([].slice.call(args));
  return path.resolve(...baseArgs);
};

Object.keys(config.paths).forEach(pathKey => {
  config.paths[pathKey] = base.bind(null, config.paths[pathKey]);
});
config.paths.base = base;

const logger = initLogger('app:config');
logger.info('Creating project configuration.');

const overrides = environments[config.env];
if (overrides) {
  logger.info({ overrides: overrides(config) },
    `Found overrides for NODE_ENV "${config.env}", applying to default configuration.`);
  _.merge(config, overrides(config));
} else {
  logger.info(`No environment overrides found for NODE_ENV "${config.env}", defaults will be used.`);
}

// globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    NODE_ENV : JSON.stringify(config.env)
  },
  NODE_ENV     : config.env,
  __DEV__      : config.env === 'development',
  __PROD__     : config.env === 'production',
  __TEST__     : config.env === 'test',
  __COVERAGE__ : !argv.watch && config.env === 'test',
  __VERBOSE__  : config.envFlag === 'verbose',
  __API_URL__  : `"http://${config.server.host}:${config.server.port}/api"`,
  __BASENAME__ : JSON.stringify(process.env.BASENAME || name || ''),
  __APP_VERSION__ : `"${version}"`

};

const webpackConfig = configWebpack(config);
_.merge(config.webpack, webpackConfig);

logger.debug({ _trace: { config } }, `Finished configuring for environment: ${config.env}`);
module.exports = config;
