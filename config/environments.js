module.exports = {

  development : (config) => ({
    server: {
      host: 'localhost',
      port: 3000
    },
    api: {
      host: 'localhost',
      port: 3001
    },
    webpack: {
      mode: 'development',
      devtool: 'cheap-module-eval-source-map',
      // inline-source-map
      // eval-source-map
      // cheap-module-eval-source-map (original)
      // cheap-eval-source-map (transformed)
      // eval
      performance: {
        hints: false
      },
      entry: {
        app: [
          'eventsource-polyfill',
          'webpack-hot-middleware/client?reload=true'
        ]
      }
    },
    middleware: {
      dev: {
        stats: {
          colors: true,
          chunks: false
        },
        lazy : false,
        logLevel  : 'debug',
        clientLogLevel: 'debug',
        watchOptions : {
          aggregateTimeout: 100,
          poll: 1000,
          ignored: /node_modules/,
          verbosity: 'verbose'
        }
      },
      hot: {
        logLevel: 'debug',
        noInfo: false,
        quiet: false,
        reload: true,
        heartbeat: 3 * 1000,
        log: false
        //
        // noInfo: true,
        // quiet: true
      }
    }
  }),

  production : (config) => ({
    server: {
      port: 4000
    },
    api: {
      port: 4001,
      host: '45.56.1231.208'
    },
    webpack: {
      mode: 'production',
      devtool: 'source-map',
      stats           : {
        chunks       : true,
        chunkModules : true,
        colors       : true
      },
      output: {
        publicPath: '/'
      }
    }
  })
};
