const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'client',
  profile: false,
  target: 'web',
  stats : {
    chunks : false,
    chunkModules : false,
    colors : true,
    warnings: false
  },
  output: {
    publicPath : '/',
    filename : `[name].[hash].js`,
    chunkFilename: `[name].[hash].js`
  },
  node: {
    console: false,
    'child_process': 'empty',
    // https://github.com/webpack-contrib/css-loader/issues/447
    'fs': 'empty',
    // https://github.com/evanw/node-source-map-support/issues/155
    'module': 'empty'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.react.js'
    ],
    alias: {
      shared: path.resolve('shared'),
      coreStyles: path.resolve('src/styles/core.scss'),
      themes: path.resolve('src/styles/themes'),
      unit: path.resolve('test/unit'),
      'dtrace-provider' : path.resolve(__dirname, './dtrace-shim.js')
    }
  },
  entry: {
    app: [
      'whatwg-fetch'
    ]
  },
  externals: {
    'react/lib/ExecutionEnvironment' : true,
    'react/lib/ReactContext' : true,
    'react/addons' : true,
    'webpackVariables': {}
  },
  module: {},
  optimization: {
    namedModules: true,
    // splitChunks: { chunks: 'all' }
  }
};
