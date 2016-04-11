var webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: ['babel-polyfill', './src/assets/js/main.js'],
  output: {
    path: path.resolve(__dirname, '../public/assets/js'),
    publicPath: '/assets/js/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery'
    }),
    new webpack.ProvidePlugin({
      Tether: "tether",
      'window.Tether': 'tether'
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.BannerPlugin('@TODO: Add build version')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  node: {
    fs: "empty"
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      app: path.resolve('./src/assets/js')
    },
  }
};