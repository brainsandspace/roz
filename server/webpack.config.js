/** Config for the server which uses babel via webpack */

const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: ['babel-polyfill', __dirname],

  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, './')
  },

  module: {
    
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/],
      },
    ]

  },

  target: 'node',

  devtool: 'cheap-module-eval-source-map'
}
