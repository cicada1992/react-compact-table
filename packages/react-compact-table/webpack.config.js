'use strict';

/******************************************************************************

  This is the main Webpack configuration.

 *****************************************************************************/

const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

/**
 * I/O
 */
const SRC_DIR = path.join(__dirname, 'src'),
  DIST_DIR = path.join(__dirname, 'dist/');

const exportConfig = {
  mode: 'production',
  entry: {
    index: ['./src']
  },
  output: {
    path: DIST_DIR,
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'umd',
    auxiliaryComment: 'Test Comment'
  },
  target: 'node',
  externals: [
    nodeExternals(),
    { react: 'react', 'react-dom': 'react-dom', 'styled-components': 'styled-components', lodash: 'lodash' }
  ],
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
        loaders: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx'],
    modules: [SRC_DIR, 'node_modules'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@icons': path.resolve(__dirname, 'src/icons')
    }
  }
};

module.exports = exportConfig;
