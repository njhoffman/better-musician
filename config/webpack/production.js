const { optimize: { DedupePlugin, UglifyJsPlugin } } = require('webpack');

module.exports = (config) => ({
  plugins: [
    new DedupePlugin(),
    new UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    })
  ]
});
