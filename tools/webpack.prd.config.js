var webpackConfig = require('./webpack.base.config');
var webpack = require('webpack');
var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const plugins = webpackConfig.plugins.slice();
plugins.push(
  new LodashModuleReplacementPlugin,
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  })
);

module.exports = Object.assign({}, webpackConfig, {
  plugins: plugins
});