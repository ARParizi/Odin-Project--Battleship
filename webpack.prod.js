const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    // devtool: 'source-map', // fairly quick build speed that's recommended for production use
});