
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.json', '.js', 'jsx'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/tpl/index.html'
    })
  ]
};