/* eslint-disable */
import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const entryPath = path.join(__dirname, 'src', 'index.ts');
const bundlePath = path.join(__dirname, 'dist');
const htmlTemplatePath = path.join(__dirname, 'src', 'index.html');
const assetsPath = path.resolve(__dirname, 'src', 'assets');
const utilsPath = path.resolve(__dirname, 'src', 'utils');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const faviconPath = path.join(__dirname, 'src', 'assets', 'favicon.png');

const config: Configuration = {
  entry: entryPath,
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: bundlePath,
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Rs-Clone',
      alwaysWriteToDisk: true,
      template: htmlTemplatePath,
      inject: 'body',
      favicon: faviconPath,
      clean: true,
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      directory: distPath,
    },
    port: 8080,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          'sass-loader',
        ],
        // options: { module: true },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(html)$/i,
        use: ['html-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss'],
    alias: { assets: assetsPath, src: srcPath, utils: utilsPath },
  },
};

export default config;
