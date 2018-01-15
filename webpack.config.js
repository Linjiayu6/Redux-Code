const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/frameworks/entry.js',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // css modules: .src-style-home_testBQKTT
              localIdentName: '[path][name]_[local][hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/, use: 'url-loader?mimetype=image/png',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        loader: 'url-loader?limit=1&hash=sha512&digest=hex&size=16&name=resources/[hash].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: module => module.context && module.context.includes('node_modules'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
