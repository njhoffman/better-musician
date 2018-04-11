module.exports = {
  plugins: {
    'postcss-import': {
      path: 'src/css/',
    },
    'postcss-cssnext': {
      browsers: [
        'last 2 versions',
        '> 1%',
      ],
    },
  },
};
