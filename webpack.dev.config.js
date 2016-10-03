const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, "public"),
    publicPath: '/public/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: path.join(__dirname, "node_modules")
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
