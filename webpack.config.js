const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const inProductionMode = NODE_ENV === 'production';

let envVars = {};
if (inProductionMode) {
    // TODO: check out EnvironmentPlugin: https://webpack.js.org/plugins/environment-plugin/
    envVars = {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        // 'process.env.PORT': JSON.stringify(process.env.PORT),
        'process.env.GOOGLE_URL_SHORTENER_API:': JSON.stringify(process.env.GOOGLE_URL_SHORTENER_API),
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
        'process.env.HEROKU_URL': JSON.stringify(process.env.HEROKU_URL)
    }
} else {
    const dotEnvVars = require('dotenv').config().parsed;
    envVars = Object.keys(dotEnvVars).
    reduce( (acc, key) => {
        acc['process.env'][key] = JSON.stringify(dotEnvVars[key]);
        return acc;
    }, {
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    });
}

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(envVars),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '/src/index.html')
    }),
    new ExtractTextPlugin('main.css')
];

if (inProductionMode) {
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    )
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin() // <-- To generate hot update chunks
    )
}

/*On how to use Hot Module Replacement + React Hot Loader, see:
 https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96#.npgb2r5nn
 http://gaearon.github.io/react-hot-loader/getstarted/*/
// TODO: enable hot reloading for scss files(?)
module.exports = {
    entry: inProductionMode ? {
        bundle: './src/index.js',
        vendor: ['react', 'react-dom', 'react-redux', 'redux', 'redux-persist', 'redux-thunk']
    } : [
        'webpack-dev-server/client?http://localhost:8080', // <-- Enables websocket connection (needs url and port)
        'webpack/hot/only-dev-server', // <-- to perform HMR in the browser; "only" prevents reload on syntax errors
        './src/index.js' // <-- The appʼs entry point
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: inProductionMode ? '[name].[chunkhash].js' : 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "/src"),
                    path.join(__dirname, "/redux"),
                    path.join(__dirname, "/utils")
                ],
                use: inProductionMode ? ['babel-loader'] : ['react-hot-loader', 'babel-loader']
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
        extensions: ['.jsx', '.js', '.scss'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },

    plugins,

    devtool: inProductionMode ? undefined : 'source-map',

    devServer: {
        hot: true // <-- Enables HMR in webpack-dev-server and in libs running in the browser
    }
};
