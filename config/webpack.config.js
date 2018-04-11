const argv = require('yargs').argv;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const autoprefixer = require('autoprefixer');
// const StatsPlugin = require('stats-webpack-plugin');
const project = require('./project.config');
// const HappyPack = require('happypack');
const _ = require('lodash');


const webpackLoaders = require('./webpack/loaders')(project);
//
// const { log } = require('debugger-256')('app:config:webpack');

// url-loader: images to base64 string
//
// sass-loader: compile sass to css
//   css-loader: css to string (css modules local scoped css)
//     style-loader: add css to the dom by inject a style tag with string from css-loader
//     file-loader: adds URL instead of inline css
//
// extract text plugin: bundles css into separate css files
// html-webpack-plugin: generates html that includes script bundles and css (extracted with extract text plugin)

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;
const __API_URL__ = project.globals.__API_URL__;

// console.log('Creating webpack configuration.', resolvePaths);
console.log(`API Path Global: ${__API_URL__}`);

const webpackConfig = {
  name    : 'client',
	mode    : project.env,
  profile : false,
  target  : 'web',
  devtool : project.compiler_devtool,
  stats: {
    chunks: false,
    // turn off webpack warnings (specifically require function is used in a way... only do this for tests?)
    warnings: false
  },
  resolve : {
    modules: ['node_modules', 'src'],
    alias: {
      shared: path.resolve('shared'),
			coreStyles: path.resolve('src/styles/core.scss'),
			themes: path.resolve('src/styles/themes'),
      unit: path.resolve('test/unit')
    },
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.react.js'
    ]
  },
  module : {},
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    concatenateModules: true
  }
};
console.log(webpackConfig);
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js');

webpackConfig.entry = { vendor: project.vendors };

if (__DEV__) {
// IE doesn't support eventsource, bitdefender in windows blocks eventsource events
// https://github.com/glenjamin/webpack-hot-middleware/issues/36
// for alternate solution use socket.io as transport for webpack-hmr https://github.com/lytc/webpack-hmr/
	webpackConfig.entry.bundle = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    APP_ENTRY
	];
} else {
	webpackConfig.entry.bundle = [APP_ENTRY];
}

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
	new webpack.ProvidePlugin({
		// make fetch available
		fetch: 'exports-loader?self.fetch!whatwg-fetch'
	}),
  new HtmlWebpackPlugin({
    template : project.paths.client('index.html'),
    favicon  : project.paths.public('favicon.ico'),
    filename : 'index.html',
    hash     : false,
    inject   : true ,
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
        console.lerror(stats.compilation.errors);
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        );
      }
    });
  });
}

if (__DEV__) {
  console.log('Enabling plugins for live development (HappyPack, HMR, NoErrors).');
  webpackConfig.plugins.push(
    // new HappyPack({
    //   loaders: [ 'babel?presets[]=' + project.compiler_babel.presets.join(',presets[]=') ]
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false // show a warning when there is a circular dependency
    })
  );
} else if (__PROD__) {
  console.log('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
  webpackConfig.plugins.push(
    // new webpack.optimize.OccurrenceOrderPlugin(),
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
	webpackConfig.optimization.splitChunks = {
		chunks: "async",
		minSize: 30000,
		minChunks: 1,
		maxAsyncRequests: 5,
		maxInitialRequests: 3,
		name: true,
		cacheGroups: {
			default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true,
			},
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			}
		}
	};
}

// ------------------------------------
// Loaders
// ------------------------------------
console.log(webpackLoaders);
webpackConfig.module.rules =  webpackLoaders;

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  console.log('Applying ExtractTextPlugin to CSS loaders.');
  // webpackConfig.module.rules.filter((loader) =>
  //   loader.rules && loader.rules.find((name) => /css/.test(name.split('?')[0]))
  // ).forEach((loader) => {
  //   const first = loader.rules[0];
  //   const rest = loader.rules.slice(1);
  //   loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
  //   delete loader.rules;
  // });

  webpackConfig.plugins.push(require('autoprefixer'));

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks : true
    })
  );
}

module.exports = webpackConfig;
