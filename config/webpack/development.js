const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const StatsPlugin = require('stats-webpack-plugin');
// const HappyPack = require('happypack');

module.exports = (config) => ({
  plugins: [
    // new StatsPlugin('./webpack.stats.json',{
    //   chunkModules: true, exclude: [/node_modules [\\\/]react/]
    // }),
    // new HappyPack({
    //   loaders: [ 'babel?presets[]=' + project.compiler_babel.presets.join(',presets[]=') ]
    // }),
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
