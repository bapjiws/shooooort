const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            }
        ]
    },

    resolve: {
        extensions: ['.jsx', '.js']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/app/index.html')
        })
    ]
};
