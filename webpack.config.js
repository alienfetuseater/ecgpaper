const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.ts',
	output: {
		chunkFilename: '[name].bundle.js',
	},
	devServer: {
		historyApiFallback: {
			index: 'dist/index.html',
		},
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	devtool: 'none',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.ts?$/,
				exclude: /node_modules/,
				use: ['ts-loader', 'babel-loader', 'eslint-loader'],
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[hash].[ext]',
						outputPath: 'imgs',
					},
				},
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
		],
	},
}
