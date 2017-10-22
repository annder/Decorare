var webpack = require("webpack");
var path = require("path");
module.exports = {
    module: {
        loaders: [{
            test: /\.js/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: [
                        'transform-class-properties',
                        'transform-decorators-legacy',
                        'transform-object-rest-spread'
                    ]
                }
            }]
        }]
    },
    entry: {
        index: "./index.js",
        verb: ['lodash']
    },
    output: {
        path: path.join(__dirname, './src'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "verb",
            filename: "[name].js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            }
        }),
    ]
}