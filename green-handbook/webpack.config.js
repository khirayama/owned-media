const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publisherConfig = require('./config');
const getEntrypoints = require('./helpers/getEntrypoints');
const pagePath = path.resolve(process.cwd(), 'src', 'index.ts');

module.exports = (env, argv) => {
  const config = {
    entry: {
      index: './src/index.ts',
    },
    output: {
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: getEntrypoints(publisherConfig).map((entrypoint) => {
      return new HtmlWebpackPlugin({
        template: './src/renderer.tsx',
        filename: `.${entrypoint === '/' ? '' : entrypoint}/index.html`,
        inject: false,
      });
    }),
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
