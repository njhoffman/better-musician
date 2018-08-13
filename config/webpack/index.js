const argv = require('yargs').argv;
const webpack = require('webpack');
const _ = require('lodash');

const logger = require('../../shared/logger')('app:config:webpack');
const baseConfig = require('./base.js');

module.exports = (config) => {
  const { __TEST__, __API_URL__ } = config.globals;

  _.merge(config.webpack, baseConfig);
  const loaders = require('./loaders')(config);

  logger.info(`API Path Global: ${__API_URL__}`);

  config.webpack.mode = config.env === 'production' ? 'production' : 'development';

  const APP_ENTRY = config.paths.client('app.js');
  config.webpack.entry.app.push(APP_ENTRY);
  config.webpack.output.path = config.paths.dist();

  _.merge(config.webpack.externals.webpackVariables, { apiUrl: `${__API_URL__}` });

  config.webpack.plugins = [
    new webpack.DefinePlugin(config.globals),
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch'
    })
  ];

  // exit on errors during testing so that they do not get skipped and misreported
  if (__TEST__ && !argv.watch) {
    config.webpack.plugins.push(function () {
      this.plugin('done', function (stats) {
        if (stats.compilation.errors.length) {
          // pretend no assets were generated, prevents tests from running to make warnings noticeable
          logger.error(stats.compilation.errors);
          throw new Error(stats.compilation.errors.map(err => err.message || err));
        }
      });
    });
    // TODO: Don't split bundles during testing, since we only want import one bundle
  }

  config.webpack.module.rules = loaders;

  const webpackEnv = config.webpack.mode === 'production'
    ? require('./production')(config)
    : require('./development')(config);

  _.merge(config.webpack, webpackEnv, { plugins: [].concat(webpackEnv.plugins, config.webpack.plugins) });
  return config.webpack;

  // const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
  // const smp = new SpeedMeasurePlugin({ outputFormat: 'human' });
  // return smp.wrap(config.webpack);
};
