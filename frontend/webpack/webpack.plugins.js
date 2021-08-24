/**
 * Webpack plugins for production
 *
 *
 */
const path = require("path");

// Webpack plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * Html Webpack plugin
 *
 */
const htmlWebpack = new HtmlWebpackPlugin({
  template: "public/index.html",
  filename: "index.html",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
  inject: true,
});

/**
 * Copy webpack plugin
 *
 */
const copyWebpack = new CopyPlugin([
  {
    from: path.resolve(__dirname, "../public"),
    to: "",
    ignore: [".DS_Store"],
  },
]);

/**
 * MiniCSS extract plugin
 *
 */
const miniCssExtract = new MiniCssExtractPlugin({
  filename: "[name].[hash].css",
  chunkFilename: "[id].[hash].css",
});

/**
 * Optimize css assets
 *
 */
const optimizeCssAssets = new OptimizeCSSAssetsPlugin({});

/**
 * Clean webpack plugin before build
 *
 */
const cleanWebpack = new CleanWebpackPlugin();

module.exports = {
  htmlWebpack,
  copyWebpack,
  miniCssExtract,
  optimizeCssAssets,
  cleanWebpack,
};
