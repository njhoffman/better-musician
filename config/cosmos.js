// const config = require('./index');

module.exports = {
  // Set all other paths relative this this one. Important when cosmos.config
  // isn't placed in the project root
  rootPath: '../',

  // Additional entry points that should be present along with any component
  // Sad, but inevitable
  globalImports: ['src/styles/core.scss', 'src/styles/vendors.scss'],

  // Customize pattern(s) for matching fixture files
  // fileMatch: ['*|)}>#fixtures-in-here#<{(||)}>#*.js'],

  // Fixtures will not be loaded in the playground if their names match these
  exclude: [/test/, /__fixtures__\/utils/, /.*\.props\.js/],

  // File path to serve static files from. Like --content-base in webpack-dev-server
  publicPath: 'src',

  // Set base URL for both webpack assets and static files from publicPath
  // Maps to webpack.output.publicPath
  // https://webpack.js.org/configuration/output/#output-publicpath
  // publicUrl: '/public/',
  // publicUrl: 'http://localhost:3000/',
  publicUrl: '/',

  // Customize proxies file path. Useful if Babel doesn't compile the root dir
  // proxiesPath: 'src/proxies.cosmos',
  proxiesPath: 'src/cosmos.proxies.js',

  // Render inside custom root element. Useful if that root element already
  // has styles attached, but bad for encapsulation
  // containerQuerySelector: '#app',

  // Disable hot module replacement
  // hot: false,

  // HTTP proxy specific requests to a different target
  // httpProxy: {
  //   context: '/api',
  //   target: 'http://localhost:4000/api'
  // },

  // Reuse existing webpack config
  webpackConfigPath: './config/',

  // Customize webpack config
  webpack: (config, { env }) => {
    return config.webpack;
  },

  // Specify where should webpack watch for fixture files (defaults to rootPath)
  watchDirs: ['src'],

  // Customize dev server
  hostname: '0.0.0.0',
  port: 8989
};
