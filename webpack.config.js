const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require("path");

module.exports = {
  entry: './index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist')
  },

  devServer: {
    hot: true,
    port: 8081,
    stats: "errors-only",
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'common.css' }),
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']})
  ],

  module: {
    rules: [{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }],
  },
}