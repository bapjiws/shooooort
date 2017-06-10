// See https://github.com/avajs/ava/blob/master/docs/recipes/precompiling-with-webpack.md
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['./tests/index.js'],
    target: 'node',
    output: {
        path: path.join(__dirname, '_build'),
        filename: 'tests.js'
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    }
};