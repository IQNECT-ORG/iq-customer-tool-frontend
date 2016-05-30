var webpackConfig = require('./webpack.base.config');
var webpack = require('webpack');
var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const plugins = webpackConfig.plugins.slice();
plugins.push(
  new LodashModuleReplacementPlugin,
  new webpack.optimize.UglifyJsPlugin({
    screw_ie8: true,
    source_map: false,
    compress: {
      sequences: true,
      properties: true,
      dead_code: true,
      drop_debugger: true,
      conditionals: true,
      comparisons: true,
      evaluate: true,
      booleans: true,
      loops: true,
      unused: true,
      hoist_funs: true,
      if_return: true,
      join_vars: true,
      cascade: true,
      collapse_vars: true,
      warnings: false,
      drop_console: true,
      keep_fargs: false,
      keep_fnames: false,
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    '__ENV__': '"prd"'
  })
);

module.exports = Object.assign({}, webpackConfig, {
  plugins: plugins
});