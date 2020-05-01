// webpack.common.js - common webpack config
const LEGACY_CONFIG = 'legacy';
const MODERN_CONFIG = 'modern';

// node modules
const path = require('path');
const merge = require('webpack-merge');

// webpack plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackNoModulePlugin } = require('webpack-nomodule-plugin');

// config files
const pkg = require('../package.json');
const settings = require('./webpack.settings.js');

// Configure Babel loader
const configureBabelLoader = (browserList) => {
  return {
    test: /\.js$/,
    exclude: [/(node_modules|bower_components)/],
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          sourceType: 'unambiguous',
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {
                modules: false,
                corejs: {
                  version: 2,
                  proposals: true,
                },
                useBuiltIns: 'usage',
                targets: {
                  browsers: browserList,
                },
              },
            ],
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      'eslint-loader',
    ],
  };
};

// Configure Entries
const configureEntries = () => {
  let entries = {};
  for (const [key, value] of Object.entries(settings.entries)) {
    entries[key] = path.resolve(__dirname, settings.paths.src.base + value);
  }

  return entries;
};

// Configure Font loader
const configureFontLoader = () => {
  return {
    test: /\.(ttf|eot|woff2?)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  };
};

// Configure Manifest
const configureManifest = (fileName) => {
  return {
    fileName: fileName,
    basePath: settings.manifestConfig.basePath,
    map: (file) => {
      file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
      return file;
    },
  };
};

// Configure Html webpack
const configureHtml = () => {
  return {
    template: './src/index.html',
    filename: 'index.html',
    inject: true,
  };
};

// The base webpack config
const baseConfig = {
  name: pkg.name,
  entry: configureEntries(),
  output: {
    path: path.resolve(__dirname, settings.paths.dist.base),
    publicPath: settings.urls.publicPath(),
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: 'Webpack',
      excludeWarnings: true,
      alwaysNotify: true,
    }),
    new HtmlWebpackPlugin(configureHtml()),
    // new WebpackNoModulePlugin({
    //   filePatterns: ['**/**/**-legacy.**.js'],
    // }),
  ],
};

// Legacy webpack config
const legacyConfig = {
  module: {
    rules: [
      configureBabelLoader(Object.values(pkg.browserslist.legacyBrowsers)),
    ],
  },
  plugins: [new ManifestPlugin(configureManifest('manifest-legacy.json'))],
};

// Modern webpack config
const modernConfig = {
  module: {
    rules: [
      configureBabelLoader(Object.values(pkg.browserslist.modernBrowsers)),
    ],
  },
  plugins: [new ManifestPlugin(configureManifest('manifest.json'))],
};

// Common module exports
// noinspection WebpackConfigHighlighting
module.exports = {
  legacyConfig: merge.strategy({
    module: 'prepend',
    plugins: 'prepend',
  })(baseConfig, legacyConfig),
  modernConfig: merge.strategy({
    module: 'prepend',
    plugins: 'prepend',
  })(baseConfig, modernConfig),
};
