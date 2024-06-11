const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function getChunks(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        title: chunk.title,
        filename: `${chunk.filename}.html`,
        chunks: [chunk.filename],
      })
  );
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    popup: path.resolve('./src/popup/popup.jsx'),
    options: path.resolve('./src/options/options.jsx'),
    background: path.resolve('./src/background/background.js'),
    contentScript: path.resolve('./src/contentScript/contentScript.js'),
  },
  module: {},
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve('src/static'), to: path.resolve('dist') },
      ],
    }),
    ...getChunks([
      {
        title: 'Popup - NIKI Guard',
        filename: 'popup',
      },
      {
        title: 'Options - NIKI Guard',
        filename: 'options',
      },
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /\.css$/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
