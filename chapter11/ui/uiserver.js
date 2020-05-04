require('dotenv').config();
const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && process.env.NODE_ENV !== 'production') {
  console.log('Adding dev middleware, enabling HMR');
  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleWare = require('webpack-hot-middleware');

  const config = require('./webpack.config.js');
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleWare(compiler));
}

app.use(express.static('public'));
const apiProxyTarget = process.env.API_PROXY_TARGET;

if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget, changeOrigin: true }));
}

if (!process.env.UI_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = 'http://localhost:3000/graphql';
}

if (!process.env.UI_SERVER_API_ENDPOINT) {
  process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

app.get('/env.js', (req, res) => {
  const env = {
    UI_API_ENDPOINT: process.env.UI_API_ENDPOINT,
  };
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

const port = process.env.UI_SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});
