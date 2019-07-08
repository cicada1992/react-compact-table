const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const _ = require('lodash');

module.exports = ({ config }) => {
  // we don't need fileLoader. Because this makes some error about svg, we have to remove.
  const fileLoaderRule = config.module.rules.find((rule) => {
    if (rule.loader) {
      const regex = /file-loader/g;
      return rule.loader.match(regex);
    }
  });
  _.pull(config.module.rules, fileLoaderRule);

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: {
      loader:
        'ts-loader?experimentalFileCaching=true&onlyCompileBundledFiles=true&transpileOnly=true'
    }
  });
  config.module.rules.push({
    test: /\.(png|jpg|gif|csv)$/,
    loader: 'url-loader?limit=4096'
  });
  config.module.rules.push({
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
  });
  config.plugins.push(new TSDocgenPlugin());
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    '@components': path.resolve(__dirname, '../src/components'),
    '@icons': path.resolve(__dirname, '../src/icons')
  };
  return config;
};
