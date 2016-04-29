var webpackConfig = require('./webpack.base.config');
var webpack = require('webpack');
var path = require('path');

const loaders = [
  {
    test: /\.js$/,
    exclude: [
      path.resolve(__dirname, '../src/assets/js'),
      path.resolve(__dirname, '../node_modules/')
    ],
    loader: 'babel',
    query: {
      presets: ['airbnb']
    }
  },
  {
    test: /\.js$/,
    include: path.resolve(__dirname, '../src/assets/js'),
    exclude: [
      path.resolve(__dirname, '../src/assets/js/**/__tests__/')
    ],
    loader: 'isparta'
  }
];

module.exports = Object.assign({}, webpackConfig, {
  devtool: 'inline-source-map',
  isparta: {
    embedSource: true,
    noAutoWrap: true,
    // these babel options will be passed only to isparta and not to babel-loader
    // babel: {
    //   presets: ['es2015', 'stage-0', 'react']
    // }
  },

  module: Object.assign({}, webpackConfig.module, {
    loaders: loaders
  }),

  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
});


