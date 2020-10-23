const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MinifyPlugin = require('babel-minify-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
// const ASSET_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];
const MANIFEST_FILE = 'manifest.json';

const manifestPath = path.join(SRC_DIR, MANIFEST_FILE);

module.exports = {
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	context: path.resolve(__dirname, 'src'),
	entry: { background_script: './background_script.js', content_script: './content_script.js' },
	module: {
		rules: [
			{
				test: /\.html$/i,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: IS_PRODUCTION,
							// attrs: ['link:href', 'script:src', 'img:src'],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
		],
	},
	plugins: [new CopyWebpackPlugin({ patterns: [{ from: 'manifest.json', to: '.' }] }), new CleanWebpackPlugin()],
};
