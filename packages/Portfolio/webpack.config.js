const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ["@Common"]: path.resolve(__dirname, 'src/components/common/'),
      ["@Services"]: path.resolve(__dirname, 'src/services/'),
      ["@Store"]: path.resolve(__dirname, 'src/redux/'),
    }
  },
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'awesome-typescript-loader',
          {
            loader: 'tslint-loader',
            options: {
              configFile: path.resolve(__dirname, 'tslint.json'),
            }
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};