// webpack.settings.js - webpack settings config

// node modules
require('dotenv').config();

// Webpack settings exports
// noinspection WebpackConfigHighlighting
module.exports = {
  paths: {
    src: {
      base: '../src/',
    },
    template: '../src/',
    dist: {
      base: '../dist/',
      clean: ['**/*'],
    },
  },
  urls: {
    live: 'https://example.com/',
    local: 'http://example.test/',
    critical: 'http://example.test/',
    publicPath: () => process.env.PUBLIC_PATH || '/qr-code-generator/',
  },
  vars: {
    cssName: 'styles',
  },
  entries: {
    app: 'index.js',
  },
  devServerConfig: {
    public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:1234',
    host: () => process.env.DEVSERVER_HOST || 'localhost',
    poll: () => process.env.DEVSERVER_POLL || false,
    port: () => process.env.DEVSERVER_PORT || 1234,
    https: () => process.env.DEVSERVER_HTTPS || false,
  },
  manifestConfig: {
    basePath: '',
  },
  createSymlinkConfig: [
    {
      origin: 'img/favicons/favicon.ico',
      symlink: '../favicon.ico',
    },
  ],
};
