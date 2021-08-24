/**
 * Webpack config for building front-end in development
 *
 * @author Ulrich
 *
 * @copyright Vertics Co 2019
 */

const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const base = require("./webpack.config.base");
const loadPresets = require("./loadPresets");

module.exports = (env = "development") =>
  merge(
    base,
    {
      mode: "development",
      devtool: "eval-source-map",
      output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
      },
      module: {
        rules: [
          {
            test: /\.(?:sa|sc|c)ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
      devServer: {
        // stats: {
        //   colors: true,
        //   hash: false,
        //   version: false,
        //   timings: true,
        //   assets: false,
        //   chunks: false,
        //   modules: false,
        //   reasons: false,
        //   children: false,
        //   source: true,
        //   errors: true,
        //   errorDetails: false,
        //   warnings: false,
        //   publicPath: false,
        // },
        // server default port
        port: 3001,
        historyApiFallback: true,
        hot: true,
        // contentBase: path.resolve(__dirname, "./public/"),
        static: "./public",
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
          inject: true,
          template: "public/index.html",
          filename: "index.html",
        }),
      ],
    },
    loadPresets(env)
  );
