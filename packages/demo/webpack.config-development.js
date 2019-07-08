/******************************************************************************
  
  FOR DEVELOPMENT BUILDS
    - hot reload
    - webpack dev server

 *****************************************************************************/
const webpack = require('webpack');
const _ = require('lodash');

const defaults = require('./webpack.config');

const define = new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('development') }
  }),
  hotModule = new webpack.HotModuleReplacementPlugin();

const PORT = 3000;
const URL = 'http://localhost:' + PORT;

function patchEntry(entry) {
  const files = [];
  files.push('webpack-dev-server/client?' + URL);
  files.push(entry);
  return _.flatten(files);
}

var config = Object.assign({}, defaults);

config.mode = 'development';
config.devtool = 'inline-source-map';
config.entry.demo = patchEntry(config.entry.demo);
config.plugins = defaults.plugins.concat([define, hotModule]);

module.exports = config;
