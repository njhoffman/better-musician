require('../server/server.babel'); // babel registration (runtime transpilation for node)
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/');
const initLogger = require('../shared/logger');

const { info, warn, error } = initLogger('app:compile');

// Wrapper around webpack to promisify its compiler and supply friendly logging
const webpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(config.webpack);
    compiler.run((err, stats) => {
      if (err) {
        error('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      }

      const jsonStats = stats.toJson();
      info('Webpack compile completed.');
      info(stats.toString(config.compiler_stats));

      if (jsonStats.errors.length > 0) {
        error('Webpack compiler encountered errors.');
        error(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        warn('Webpack compiler encountered warnings.');
        warn(jsonStats.warnings.join('\n'));
      } else {
        info('No errors or warnings encountered.');
      }
      return resolve(jsonStats);
    });
  });

const compile = () => {
  info({ config }, 'Starting compiler.');
  return Promise.resolve()
    .then(() => webpackCompiler(config.webpack))
    .then(stats => {
      if (stats.warnings.length && config.compiler_fail_on_warning) {
        throw new Error('Config set to fail on warning, exiting with status code "1".');
      }
      info('Copying static assets to dist folder.');
      fs.copySync(config.paths.public(), config.paths.dist());
    })
    .then(() => {
      info('Compilation completed successfully.');
    })
    .catch((err) => {
      error('Compiler encountered an error.', err);
      process.exit(1);
    });
};

compile();
