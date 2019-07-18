'use strict';

/******************************************************************************

  This is the main Webpack configuration.

 *****************************************************************************/

const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');

/**
 * I/O
 */
const SRC_DIR = path.join(__dirname, 'src'),
  DIST_DIR = path.join(__dirname, 'dist/');

const port = 3000;

const exportConfig = {
  entry: {
    demo: ['./src']
  },
  output: {
    path: DIST_DIR,
    filename: 'demo.js',
    publicPath: 'http://localhost:' + port
  },
  module: {
    rules: [
      { test: /\.(png|jpg|gif|csv)$/, loader: 'url-loader?limit=4096' },
      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false
              }
            }
          }
        }
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'ts-loader?experimentalFileCaching=true&onlyCompileBundledFiles=true&transpileOnly=true'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DuplicatesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'Demo for RCT', template: 'src/index.html' })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [SRC_DIR, path.join(__dirname, 'node_modules'), 'node_modules']
  }
};

module.exports = exportConfig;
