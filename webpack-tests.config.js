// See https://github.com/avajs/ava/blob/master/docs/recipes/precompiling-with-webpack.md
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', './tests/index.js'],
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    output: {
        path: path.join(__dirname, '_build'),
        filename: 'tests.js'
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: [path.join(__dirname, 'src')]
    },
};