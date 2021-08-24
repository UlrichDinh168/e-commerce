/**
 * Common webpack configuration
 *
 * @author Vinh Le <vinh@vertics.co>
 *
 * @copyright Vertics Co 2019
 */

const path = require('path')
const Dotenv = require('dotenv-webpack')
const { helpers } = require('chart.js')
const webpack = require('webpack')
module.exports = {
	entry: path.resolve(__dirname, '../src/index.jsx'),
	output: {
		path: path.resolve(__dirname, '../build'),
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			constants: path.resolve(__dirname, '../src/constants.js'),
			shared: path.resolve(__dirname, '../src/shared'),
			services: path.resolve(__dirname, '../src/services'),
			assets: path.resolve(__dirname, '../src/assets'),
			pages: path.resolve(__dirname, '../src/pages'),
			helpers: path.resolve(__dirname, '../src/helpers'),
			hooks: path.resolve(__dirname, '../src/hooks'),
			actions: path.resolve(__dirname, '../src/actions'),
			reducers: path.resolve(__dirname, '../src/reducers'),
			hocs: path.resolve(__dirname, '../src/hocs'),
			utils: path.resolve(__dirname, '../src/utils'),
			modules: path.resolve(__dirname, '../src/modules'),
			data: path.resolve(__dirname, '../src/data')
		}
	},
	module: {
		rules: [
			{
				test: /\.(js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|jpg|gif)$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				use: 'file-loader'
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader'
					}
				]
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: 'html-loader'
					},
					{
						loader: 'markdown-loader',
						options: {
							pedantic: true
						}
					}
				]
			}
		]
	},
	plugins:
		process.env.NODE_ENV === 'development'
			? [new Dotenv()]
			: [
					new webpack.DefinePlugin({
						'process.env': {
							BACKEND_BASE_URL: JSON.stringify(process.env.BACKEND_BASE_URL)
						}
					}),
					new Dotenv({
						systemvars: true
					})
			  ]
}