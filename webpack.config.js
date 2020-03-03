const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    entry: './src/index.js',
    devtool: 'none',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'imgs'
                    }
                }
            }
        ]
    }
}
