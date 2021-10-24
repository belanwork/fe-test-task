const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {};

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname),
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: path.resolve('/public/'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.png', '.svg', '.jpg', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    historyApiFallback: true,
  },
  devtool: isDev
    ? 'source-map'
    : '',
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
        to: path.resolve(__dirname, 'build'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    ],
  },
};
