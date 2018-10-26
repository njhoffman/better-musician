const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const StatsPlugin = require('stats-webpack-plugin');

module.exports = (config) => ({
  plugins: [
    // new StatsPlugin('./webpack.stats.json',{
    //   chunkModules: true, exclude: [/node_modules [\\\/]react/]
    // }),
    // new HappyPack({
    //   loaders: [ 'babel?presets[]=' + project.compiler_babel.presets.join(',presets[]=') ]
    // }),
    // new HardSourceWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 8888,
      analyzerHost: '0.0.0.0'
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template : config.paths.client('index.html'),
      favicon  : config.paths.public('favicon.ico'),
      filename : 'index.html',
      hash     : false,
      inject   : true,
      minify   : {
        collapseWhitespace : true
      }
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false // show a warning when there is a circular dependency
    })
  ]
});
