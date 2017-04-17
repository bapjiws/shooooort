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

/*On how to use Hot Module Replacement + React Hot Loader, see:
 https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96#.npgb2r5nn
 http://gaearon.github.io/react-hot-loader/getstarted/*/
// TODO: enable hot reloading for scss files.
module.exports = {
    // Dev entry.
    entry: [
        'webpack-dev-server/client?http://localhost:8080', // <-- Enables websocket connection (needs url and port)
        'webpack/hot/only-dev-server', // <-- to perform HMR in the browser; "only" prevents reload on syntax errors
        './src/index.js' // The appʼs entry point
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "/src"),
                    path.join(__dirname, "/redux")
                ],
                use: ['react-hot-loader', 'babel-loader'] // inProductionMode ? ['babel-loader'] :
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
        new ExtractTextPlugin('main.css'),

        // For dev purposes only
        new webpack.HotModuleReplacementPlugin() // <-- To generate hot update chunks
    ],

    devtool: 'source-map', // TODO: disable in production

    devServer: {
        hot: true // <-- Enables HMR in webpack-dev-server and in libs running in the browser
    }
};
