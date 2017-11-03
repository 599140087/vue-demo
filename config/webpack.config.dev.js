import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import config from './webpack.config';

function resolve(dir) {
  return path.join(__dirname, dir);
}

export default merge(config, {
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    path: resolve('../dist'),
    chunkFilename: 'js/chunks/[id].js',
  },
  module: {
    rules: [
      {
        test: /\.global\.scss$/,
        exclude: /\.attached\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
          publicPath: '/',
        }),
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new HtmlWebpackPlugin({
      title: '运营模版系统',
      inlineSource: /manifest\.js$/,
      template: resolve('index.html'),
    }),
    new ExtractTextPlugin('css/[name].css'),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
  ],
});
