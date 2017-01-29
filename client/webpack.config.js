/** Config for the client which uses webpack */

// const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: __dirname,

  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, './')
  },

  module: {
    
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: [/node_modules/, '.*/server/.js$'],
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
      // {
      //   test: /\.s?css/,
      //   loaders: ['style-loader', 'css-loader', 'sass-loader']
      // },
      // {
      //   test: /.*\.(gif|png|jpe?g|svg)$/i,
      //   loaders: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       query: {
      //         progressive: true,
      //         optimizationLevel: 7,
      //         interlaced: false,
      //         pngquant: {
      //           quality: '65-90',
      //           speed: 4
      //         }
      //       }
      //     }
      //   ]
      // }
    ]

  },

  
  devServer: {
    contentBase: path.resolve(__dirname, './')
  },

  devtool: 'cheap-module-eval-source-map'
}
