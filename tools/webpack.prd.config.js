var webpackConfig = require('./webpack.base.config');
var webpack = require('webpack');
var path = require('path');

const plugins = webpackConfig.plugins.slice();
plugins.push(
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.optimize.DedupePlugin()
);

module.exports = Object.assign({}, webpackConfig, {
  plugins: plugins
});