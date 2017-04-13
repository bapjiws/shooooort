const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './app/index.js',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['react', 'es2015'] }
                }]
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            }
        ]
    },

    resolve: {
        extensions: ['.jsx', '.js', '.scss'],

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/app/index.html')
        }),
        new ExtractTextPlugin('styles.css')
    ]
};
