/* eslint-disable no-console */
const { argv } = require('yargs');
const config = require('./index');

const { webpack: wpConfig } = config;
// const { info } = require('debugger-256')('app:config:karma');

const karmaConfig = {
  basePath : '../', // project root in relation to bin/karma.js
  files    : [
    './node_modules/babel-polyfill/dist/polyfill.js',
    './node_modules/promise-polyfill/promise.js',
    {
      pattern  : `./${config.dir_test}/unit/test-bundler.js`,
      watched  : false,
      served   : true,
      included : true
    }
  ],
  singleRun     : !argv.watch,
  colors: true,
  client: {
    captureConsole: true
  },
  frameworks    : ['mocha'],
  reporters     : ['spec'], // 'mocha', 'spec', 'json', 'progress', 'dots'
  specReporter: {
    maxLogLines:          5, // limit number of lines logged per test
    suppressErrorSummary: false, // do not print error summary
    suppressFailed:       false, // do not print information about failed tests
    suppressPassed:       false, // do not print information about passed tests
    suppressSkipped:      true, // do not print information about skipped tests
    showSpecTiming:       false // print the time elapsed for each spec
  },
  jsonReporter: {
    stdout: true
  },
  // plugins: ['karma-spec-reporter'],
  browsers : ['PhantomJS_custom'],
  browserConsoleLogOptions: {
    level: 'log',
    // format: '%b %T: %m',
    format: '\t\t%m',
    terminal: true
  },
  customLaunchers: {
    PhantomJS_custom: {
      base: 'PhantomJS',
      options: {
        windowName: 'better-musician',
        settings: {
          webSecurityEnabled: false
        }
      },
      flags: ['--load-images=true'],
      debug: false
    }
  },
  phantomjsLauncher: {
    // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
    exitOnResourceError: true
  },
  webpack  : {
    devtool : 'cheap-module-source-map',
    resolve : Object.assign({}, wpConfig.resolve, {
      alias : Object.assign({}, wpConfig.resolve.alias, {
        sinon : 'sinon/pkg/sinon.js'
      })
    }),
    plugins : wpConfig.plugins,
    module  : {
      noParse : [
        /\/sinon\.js/,
        /\/interfaces\/.js/
      ],
      loaders : wpConfig.module.loaders.concat([
        {
          test   : /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader : 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals : Object.assign({}, wpConfig.externals, {
      'react/addons'                   : true,
      'react/lib/ExecutionEnvironment' : true,
      'react/lib/ReactContext'         : 'window'
    }),
    sassLoader : wpConfig.sassLoader
  },
  preprocessors : {
    [`${config.dir_test}/unit/test-bundler.js`] : ['webpack']
  },
  webpackMiddleware : {
    noInfo : true,
    stats: {
      colors   : true,
      chunks   : false,
      warnings : false,
      assets   : false,
      modules  : false,
      children : false
    }
  },
  coverageReporter : {
    reporters : config.coverage_reporters
  }
};

if (config.globals.__COVERAGE__) {
  if (config.globals.__VERBOSE__) {
    karmaConfig.coverageReporter.reporters.unshift({ type: 'text' });
  }
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.preLoaders = [{
    test    : /\.(js|jsx)$/,
    include : new RegExp(config.dir_client),
    exclude : [/node_modules/, '/src/interfaces/'],
    loader  : 'babel',
    query   : Object.assign({}, config.compiler_babel, {
      plugins : (config.compiler_babel.plugins || []).concat('istanbul')
    })
  }];
}

console.log('Creating karma configuration. \n'
  + `Reporter: %${karmaConfig.reporters}%\n`
  + `Test Framework: %${karmaConfig.frameworks}%\n`
  + `Browsers: %${karmaConfig.browsers}%\n`,
{ color: 'bold' }, { color: 'bold' }, { color: 'bold' });

console.info('Created karma Configuration', karmaConfig, { _depth_ : 2 });

module.exports = (cfg) => cfg.set(karmaConfig);
/* eslint-enable no-console */
