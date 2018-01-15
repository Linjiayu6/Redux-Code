const webpack = require('webpack');
const webpackMiddleware = require('koa-webpack-middleware');
const convert = require('koa-convert');

const devMiddleware = webpackMiddleware.devMiddleware;
const hotMiddleware = webpackMiddleware.hotMiddleware;

const config = require('../../webpack.config');

const devHotMiddleware = (app) => {
  const compiler = webpack(config);
  // 此时在控制台有 -> [HMR] connected
  app.use(convert(devMiddleware(compiler, {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
  })));

  app.use(convert(hotMiddleware(compiler, {
    log: console.log,
    heartbeat: 10 * 1000,
    path: '/__webpack_hmr',
  })));
};

module.exports = devHotMiddleware;
