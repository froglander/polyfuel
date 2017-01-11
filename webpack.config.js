var path = require('path');
var webpack = require('webpack');

module.exports = {

    // This code will be compiled
    entry: "./app/app.js",

    // Then output into this file
    output: {
        filename: "public/bundle.js"
    },

    devtool: 'eval-source-map',
    // This will be what we do
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    // These are the specific transformations we'll be using.
                    presets: ['stage-0', 'react', 'es2015']
                }
            }
        ]
    }

};