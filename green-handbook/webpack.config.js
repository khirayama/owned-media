// eslint-disable-next-line node/no-unpublished-require
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  const config = {
    entry: {
      index: './src/index.tsx',
    },
    output: {
      filename: isProd ? '[name].[hash].js' : '[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [new WebpackManifestPlugin()],
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
    optimization: {
      minimize: isProd,
    },
    devtool: isProd ? false : 'inline-source-map',
  };

  return config;
};
