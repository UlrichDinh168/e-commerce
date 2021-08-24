/**
 * Production webpack configuration
 *
 * @author Ulrich
 *
 * @copyright Vertics Co 2019
 */
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");

const base = require("./webpack.config.base");
const plugins = require("./webpack.plugins");

module.exports = merge(base, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.(?:sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                postcssPresetEnv(),
                require("autoprefixer")({
                  overrideBrowserslist: [">0.2%", "last 4 versions"],
                }),
              ],
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    nodeEnv: "production",
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    plugins.htmlWebpack,
    plugins.copyWebpack,
    plugins.miniCssExtract,
    plugins.optimizeCssAssets,
    plugins.cleanWebpack,
  ],
});
