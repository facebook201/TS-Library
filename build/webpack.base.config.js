
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.json', '.js', '.ts', '.tsx'],
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['awesome-typescript-loader']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/tpl/index.html'
    })
  ]
};