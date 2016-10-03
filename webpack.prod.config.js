const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: [
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude:  /node_modules/
      }
    ]
  }
};
