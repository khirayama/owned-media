const path = require('path');

const webpack = require('webpack');

const publisherConfig = require('./config');
const generateHtmlWebpackPlugins = require('./helpers/generateHtmlWebpackPlugins');
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
    plugins: generateHtmlWebpackPlugins(publisherConfig, './src/renderer.tsx'),
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
