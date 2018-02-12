const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    'index': './src/index.ts'
  },
  output: {
    filename: 'package/index.js',
    libraryTarget: 'umd',
    library: 'tsmodels',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: '*.d.ts', to: 'package', context: 'src/' }
    ])
  ]
};
