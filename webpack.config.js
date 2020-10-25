const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const actionConfig = {
	name: 'action',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/browserAction'),
	},
	context: path.resolve(__dirname, 'src/browserAction'),
	entry: { action: './main.js' },
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								strictMath: true,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			chunks: ['action'],
		}),
		new MiniCssExtractPlugin(),
	],
};

const optionConfig = {
	name: 'options',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/options'),
	},
	context: path.resolve(__dirname, 'src/options'),
	entry: { options: './main.js' },
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								strictMath: true,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			chunks: ['options'],
		}),
		new MiniCssExtractPlugin(),
	],
};

const globalConfig = {
	name: 'global',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	context: path.resolve(__dirname, 'src'),
	entry: { background_script: './background_script.js', content_script: './content_script.js' },
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'manifest.json', to: '.' },
				{ from: 'icons/', to: './icons/' },
			],
		}),
	],
};

module.exports = [globalConfig, actionConfig, optionConfig];
