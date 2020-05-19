
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.test/,
        use: [{
          loader: 'ts-loader'
        }]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
};