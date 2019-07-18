'use strict';

/******************************************************************************
  
  FOR PRODUCTION BUILDS

 *****************************************************************************/
const defaults = require('./webpack.config');
const webpack = require('webpack');

const config = Object.assign({}, defaults);

config.mode = 'production';
config.devtool = 'source-map';
config.output.publicPath = ''


module.exports = config;
