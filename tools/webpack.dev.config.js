var webpackConfig = require('./webpack.base.config');
var webpack = require('webpack');
var path = require('path');

module.exports = Object.assign({}, webpackConfig, {
  devtool: 'source-map'
});

