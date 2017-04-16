const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dotEnvVars = require('dotenv').config().parsed;
const envVars = Object.keys(dotEnvVars).
    reduce( (acc, key) => {
        acc['process.env'][key] = JSON.stringify(dotEnvVars[key]);
        return acc;
    }, {
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    });

module.exports = {
    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "/src")
                ],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['react', 'es2015', 'stage-0'] }
                }]
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.jsx', '.js', '.scss']
    },

    plugins: [
        new webpack.DefinePlugin(envVars),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html')
        }),
        new ExtractTextPlugin('main.css')
    ],

    devtool: 'source-map' // TODO: disable in production
};
