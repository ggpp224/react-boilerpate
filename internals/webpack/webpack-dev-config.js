/**
 * Created by guopeng on 16/9/2.
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const basePath = process.cwd();
const buildPath = path.join(basePath, 'static/dist');
const nodeModulesPath = path.join(basePath,'node_modules');

module.exports = (function(){

    var cfg =  {
        entry: {
            app: [
                'webpack/hot/dev-server',
                'webpack/hot/only-dev-server',
                'babel-es6-polyfill/browser-polyfill.min.js',
                'babel-plugin-px2rem/browser-polyfill.js',
                path.join(basePath,'src/app.js')
            ],
        },
        // Output file config
        output: {
            path: buildPath, // Path of output file
            filename: '[name].js', // Name of output file
            chunkFilename: '[name]-[chunkhash].js',
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: [
                        'react-hot',
                        'babel-loader',
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?' + JSON.stringify({autoprefixer: {remove: false}}) + '!less-loader', {publicPath: ''})
                },
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
            ],
        },

        plugins: [
            // Allows for sync with browser while developing (like BorwserSync)
            new webpack.HotModuleReplacementPlugin(),
            // Allows error warninggs but does not stop compiling. Will remove when eslint is added
            new webpack.NoErrorsPlugin(),
            new CopyWebpackPlugin([
                {from: path.join(basePath, 'src/www/index.html')},
            ]),
            new ExtractTextPlugin('[name].css', {allChunks: true}),
            new webpack.DllReferencePlugin({
                context: basePath,
                manifest: require('./manifest.json'),
            })
        ],

        postcss: function () {
            return [
                require('postcss-import')({ // Import all the css files...
                    glob: true,
                    root:'node_modules',
                    path:[path.join(basePath,'src/www/css')],
                    onImport: function (files) {
                        files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
                    }.bind(this) // ...so they get hot–reloaded when something changes...
                }),
                require('postcss-focus')(), // ...add a :focus to ever :hover...
                require('autoprefixer')({ // ...and add vendor prefixes...
                    browsers: ['last 2 versions', 'IE > 8', '> 1%', 'iOS>6'] // ...supporting the last 2 major browser versions and IE 8 and up...
                }),
                require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
                    clearMessages: true
                }),
               /* require('postcss-font-magician')({
                    hosted : './src/css/iconfont'
                }),*/
                require('postcss-plugins-px2rem')({remUnit: 37.5,baseDpr:1})
            ];
        },

        // Configuration for dev server
        devServer: {
            contentBase: path.join(basePath,'src/www'),
            devtool: 'source-map',
            hot: true,
            inline: true,
            port: 8080,
            // Required for webpack-dev-server.
            outputPath: buildPath,
        },

        devtool: 'eval',
    };

    return cfg;
})();
