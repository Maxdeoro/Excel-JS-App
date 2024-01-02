/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
// eslint-disable-next-line linebreak-style
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

// console.log('IS PROD', isProd);
// console.log('IS DEV', isDev);

const fileName = (ext) => isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }],
        ],
      },
    },
  ];
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};
// ];
// };

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: fileName('js'),
    // filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   prtions: {
          //     hmr: isDev,
          //     reloadAll: true,
          //   }
          // },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: jsLoaders(),
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [
        //       ['@babel/preset-env', { targets: 'defaults' }],
        //     ],
        //   },
        // },
      },
    ],
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
      // filename: 'bundle.[fullhash].css',
    }),
  ],
};
