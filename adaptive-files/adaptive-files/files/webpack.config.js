const webpack = require('webpack');
const path = require("path");

const PATHS = {
    entry: path.resolve(__dirname, "client/index"),
    output: path.resolve(__dirname, "public"),
};

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        poll: 1000,
    },
    entry: {
        shared: PATHS.entry,
    },
    output: {
        path: PATHS.output,
        filename: 'js/[name].bundle.js',
        publicPath: '/',
    },
};