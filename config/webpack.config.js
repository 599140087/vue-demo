const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function resolve(dir) {
  return path.join(process.cwd(), 'src', dir);
}

module.exports = {
  mode: 'none',
  entry: resolve('client'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader'
      },
      {
        test: /\.attached\.postcss$/,
        exclude: /\.global\.postcss$/,
        use: [
          { loader: 'style-loader/useable' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.global\.postcss$/,
        exclude: /\.attached\.postcss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.postcss$/,
        exclude: [/\.global\.postcss$/, /\.attached\.postcss$/],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.attached.postcss', '.global.postcss', '.postcss'],
    alias: {
      '~': resolve('client'),
      $lib: resolve('lib'),
      $res: resolve('res'),
      $config: resolve('client/common'),
      vue$: 'vue/dist/vue.runtime.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        },
        async: {
          name: true,
          chunks: 'async',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }
};
