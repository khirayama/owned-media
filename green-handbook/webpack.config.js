const path = require('path');

const webpack = require('webpack');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

const publisherConfig = require('./config');

module.exports = (env, argv) => {
  const config = {
    entry: {
      index: './src/index.tsx',
    },
    output: {
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
      new WebpackManifestPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        },
      ],
    },
  };

  return config;
};
