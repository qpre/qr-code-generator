// webpack.prod.js - production builds
const LEGACY_CONFIG = 'legacy';
const MODERN_CONFIG = 'modern';

// node modules
const git = require('git-rev-sync');
const glob = require('glob-all');
const merge = require('webpack-merge');
const moment = require('moment');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CreateSymlinkPlugin = require('create-symlink-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// config files
const common = require('./webpack.common.js');
const pkg = require('../package.json');
const settings = require('./webpack.settings.js');

// Configure file banner
const configureBanner = () => {
  return {
    banner: [
      '/*!',
      ' * @name           ' + '[filebase]',
      ' * @build          ' + moment().format('llll') + ' ET',
      ' * @release        ' + git.long() + ' [' + git.branch() + ']',
      ' * @copyright      Copyright (c) ' + moment().format('YYYY') + ' *',
      ' */',
      '',
    ].join('\n'),
    raw: true,
  };
};

// Configure Bundle Analyzer
const configureBundleAnalyzer = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      analyzerMode: 'static',
      reportFilename: 'report-legacy.html',
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      analyzerMode: 'static',
      reportFilename: 'report-modern.html',
    };
  }
};

// Configure Clean webpack
const configureCleanWebpack = () => {
  return {
    cleanOnceBeforeBuildPatterns: settings.paths.dist.clean,
    verbose: true,
    dry: false,
  };
};

// Configure Compression webpack plugin
const configureCompression = () => {
  return {
    filename: '[path].gz[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
    compressionOptions: {
      numiterations: 15,
      level: 9,
    },
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback);
    },
  };
};

// Configure Image loader
const configureImageLoader = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash].[ext]',
          },
        },
      ],
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash].[ext]',
          },
        },
        {
          loader: 'img-loader',
          options: {
            plugins: [
              require('imagemin-gifsicle')({
                interlaced: true,
              }),
              require('imagemin-mozjpeg')({
                progressive: true,
                arithmetic: false,
              }),
              require('imagemin-optipng')({
                optimizationLevel: 5,
              }),
              require('imagemin-svgo')({
                plugins: [{ convertPathData: false }],
              }),
            ],
          },
        },
      ],
    };
  }
};

// Configure optimization
const configureOptimization = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      splitChunks: {
        maxSize: 244000,
        chunks: 'all',
      },
      minimizer: [
        new TerserPlugin(configureTerser()),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
            safe: true,
            discardComments: true,
          },
        }),
      ],
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      splitChunks: {
        maxSize: 244000,
        chunks: 'all',
      },
      minimizer: [new TerserPlugin(configureTerser())],
    };
  }
};

// Configure Postcss loader
const configurePostcssLoader = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.(pcss|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true,
          },
        },
        {
          loader: 'resolve-url-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    };
  }
  // Don't generate CSS for the modern config in production as it was already built for legacy
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(pcss|css)$/,
      loader: 'ignore-loader',
    };
  }
};

// Configure terser
const configureTerser = () => {
  return {
    cache: true,
    parallel: true,
    sourceMap: true,
  };
};

// Configure Workbox service worker
const configureWorkbox = () => {
  let config = settings.workboxConfig;

  return config;
};

// Production module exports
module.exports = [
  merge(common.legacyConfig, {
    output: {
      filename: path.join('./js', '[name]-legacy.[chunkhash].js'),
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: configureOptimization(LEGACY_CONFIG),
    module: {
      rules: [
        configurePostcssLoader(LEGACY_CONFIG),
        configureImageLoader(LEGACY_CONFIG),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        path: path.resolve(__dirname, settings.paths.dist.base),
        filename: path.join('./css', '[name].[chunkhash].css'),
      }),
      new webpack.BannerPlugin(configureBanner()),
      new CreateSymlinkPlugin(settings.createSymlinkConfig, true),
      new BundleAnalyzerPlugin(configureBundleAnalyzer(LEGACY_CONFIG)),
    ],
    // }),
    // merge(common.modernConfig, {
    //   output: {
    //     filename: path.join('./js', '[name].[chunkhash].js'),
    //   },
    //   mode: 'production',
    //   devtool: 'source-map',
    //   optimization: configureOptimization(MODERN_CONFIG),
    //   module: {
    //     rules: [
    //       configurePostcssLoader(MODERN_CONFIG),
    //       configureImageLoader(MODERN_CONFIG),
    //     ],
    //   },
    //   plugins: [
    //     new CleanWebpackPlugin(configureCleanWebpack()),
    //     new webpack.BannerPlugin(configureBanner()),
    //     new ImageminWebpWebpackPlugin(),
    //     new WorkboxPlugin.GenerateSW(configureWorkbox()),
    //     new BundleAnalyzerPlugin(configureBundleAnalyzer(MODERN_CONFIG)),
    //   ],
  }),
];
