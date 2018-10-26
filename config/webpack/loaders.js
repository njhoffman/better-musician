const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// url-loader: images to base64 string
//
// sass-loader: compile sass to css
//   css-loader: css to string (css modules local scoped css)
//     style-loader: add css to the dom by inject a style tag with string from css-loader
//     file-loader: adds URL instead of inline css
//
// extract text plugin: bundles css into separate css files
// html-webpack-plugin: generates html that includes script bundles and css (extracted with extract text plugin)

module.exports = (config) => [{
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  use: [{
    loader: 'babel-loader',
    options : {
      cacheDirectory : true,
      presets        : [
        ['@babel/preset-env'],
        ['@babel/preset-react']
      ]
    }
  }]
}, {
  // css modules on for components
  test: /\.scss$/,
  include: /src/,
  exclude: [/node_modules/, /styles/],
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { modules: true }
    },
    'fast-sass-loader'
  ]
}, {
  // css modules off for vendors
  test: /\.scss$/,
  include: /styles/,
  exclude: [/node_modules/],
  use: [
    'style-loader',
    'css-loader',
    'fast-sass-loader'
  ]
}, {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader'
  ]
}, {
  test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
  use: 'file-loader'
}, {
  test: /\.(jpg|png|gif)$/,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        disable: true,
        gifsicle: {
          interlaced: true
        },
        mozjpeg: {
          progressive: true
        },
        optipng: {
          optimizationLevel: 7
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        }
      }
    }
  ]
}, {
  test: /\.html$/,
  use: 'html-loader'
}, {
  test: /\.(mp4|webm)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
}];
