const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (project) => [{
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  use: [{
    loader: 'babel-loader',
    options : project.compiler_babel
  }]
}, {
	// Preprocess our own .scss files
	test: /\.scss$/,
	exclude: /node_modules/,
	use: ['style-loader', 'css-loader', 'sass-loader']
}, {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader'
  ]
}, {
	test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
	use: 'file-loader',
}, {
	test: /\.(jpg|png|gif)$/,
	use: [
		'file-loader', {
			loader: 'image-webpack-loader',
			options: {
				query: {
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
			},
		},
	],
}, {
	test: /\.html$/,
	use: 'html-loader'
}, {
	test: /\.(mp4|webm)$/,
	use: {
		loader: 'url-loader',
		options: {
			limit: 10000
		},
	},
}];
