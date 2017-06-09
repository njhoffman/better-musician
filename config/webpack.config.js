const argv = require('yargs').argv;
const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const StatsPlugin = require('stats-webpack-plugin');
const project = require('./project.config');
// const HappyPack = require('happypack');
const _ = require('lodash');

const { log } = require('debugger-256')('app:config:webpack');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;
const __API_URL__ = project.globals.__API_URL__;

const _RESOLVE_PATHS = {
  coreStyles: 'src/styles/core.scss',
  assets:     'src/assets',
  themes:     'src/styles/themes',
  components: 'src/components',
  containers: 'src/containers',
  interfaces: 'src/interfaces',
  middleware: 'src/middleware',
  selectors:  'src/selectors',
  store:      'src/store',
  shared:     'shared',
  tests:      'tests/unit'
  // 'redux-orm': 'src/redux-orm',
  // 'redux-auth': 'src/redux-auth'
};

let resolvePaths = _.mapValues(_RESOLVE_PATHS, function (str) {
  return path.join(process.cwd(), str);
});

log('Creating webpack configuration.');
log(`API Path Global: ${__API_URL__}`);
const webpackConfig = {
  name    : 'client',
  profile : false,
  hints   : true,
  target  : 'web',
  devtool : project.compiler_devtool,
  stats: {
    chunks: false,
    // turn off webpack warnings (specifically require function is used in a way... only do this for tests?)
    warnings: false
  },
  resolve : {
    root       : project.paths.client(),
    extensions : ['', '.js', '.jsx', '.json'],
    alias : resolvePaths
  },
  module : {}
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js');

webpackConfig.entry = {
  app : __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor : project.compiler_vendors
};

// IE doesn't support eventsource, bitdefender in windows blocks eventsource events
// https://github.com/glenjamin/webpack-hot-middleware/issues/36
// for alternate solution use socket.io as transport for webpack-hmr https://github.com/lytc/webpack-hmr/
webpackConfig.entry.app = webpackConfig.entry.app.concat('eventsource-polyfill');

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename   : `[name].[${project.compiler_hash_type}].js`,
  path       : project.paths.dist(),
  publicPath : project.compiler_public_path
};

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;
webpackConfig.externals['webpackVariables'] = `{ apiUrl: '${__API_URL__}' }`;

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(project.globals),
  // new StatsPlugin('./webpack.stats.json',{
  //   chunkModules: true, exclude: [/node_modules [\\\/]react/]
  // }),
  new HtmlWebpackPlugin({
    template : project.paths.client('index.html'),
    hash     : false,
    favicon  : project.paths.public('favicon.ico'),
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true
    }
  })
];

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        console.log(stats.compilation.errors);
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        );
      }
    });
  });
}

if (__DEV__) {
  log('Enabling plugins for live development (HappyPack, HMR, NoErrors).');
  webpackConfig.plugins.push(
    // new HappyPack({
    //   loaders: [ 'babel?presets[]=' + project.compiler_babel.presets.join(',presets[]=') ]
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else if (__PROD__) {
  log('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    })
  );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  );
}

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfig.module.loaders = [];

// happypack loader
// webpackConfig.module.loaders.push({
//   test    : /\.(js|jsx)$/,
//   include : [/src/],
//   exclude : [/node_modules/],
//   loader  : 'happypack/loader',
//   query   : project.compiler_babel
// }, {
//   test   : /\.json$/,
//   loader : 'json'
// });

// JavaScript / JSON
webpackConfig.module.loaders.push({
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  loader  : 'babel',
  query   : project.compiler_babel
}, {
  test   : /\.json$/,
  loader : 'json'
});

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize';
// separate vendor files from css modules processing
// https://github.com/css-modules/css-modules/pull/65#issuecomment-214221200
const BASE_CSS_MODULE_LOADER = 'css?sourceMap&modules&importLoaders=2&-minimize';

// vendor global scss/css
webpackConfig.module.loaders.push({
  test    : /\.scss$/,
  include : [/styles/],
  exclude : [/node_modules/],
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
});
webpackConfig.module.loaders.push({
  test    : /\.css$/,
  include : [/styles/],
  exclude : [/node_modules/],
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
});

// app scss/css to be processed by css-module
webpackConfig.module.loaders.push({
  test    : /\.scss$/,
  include : [/src/],
  exclude : [/styles/, /node_modules/],
  loaders : [
    'style',
    BASE_CSS_MODULE_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
});
webpackConfig.module.loaders.push({
  test    : /\.css$/,
  include : [/src/],
  exclude : [/styles/, /node_modules/],
  loaders : [
    'style',
    BASE_CSS_MODULE_LOADER,
    'postcss'
  ]
});

webpackConfig.sassLoader = {
  includePaths : project.paths.client('styles')
};

webpackConfig.postcss = [
  cssnano({
    autoprefixer : {
      add      : true,
      remove   : true,
      browsers : ['last 2 versions']
    },
    discardComments : {
      removeAll : true
    },
    discardUnused : false,
    mergeIdents   : false,
    reduceIdents  : false,
    safe          : true,
    sourcemap     : true
  })
];

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  log('Applying ExtractTextPlugin to CSS loaders.');
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0];
    const rest = loader.loaders.slice(1);
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
  });

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks : true
    })
  );
}

module.exports = webpackConfig;
