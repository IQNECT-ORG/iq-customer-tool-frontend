var webpackConfig = require('./webpack.base.config');
var webpack = require('webpack');
var path = require('path');

const plugins = webpackConfig.plugins.slice();
plugins.push(
  new webpack.DefinePlugin({
    '__ENV__': '"lcl"'
  })
);

module.exports = Object.assign({}, webpackConfig, {
  devtool: 'source-map',
  plugins: plugins
});

