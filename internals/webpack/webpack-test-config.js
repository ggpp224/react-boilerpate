/**
 * Created by guopeng on 16/5/30.
 */

var path = require('path');

var projectRootPath = path.resolve(__dirname, '../../');
var nodeModulesPath = path.join(projectRootPath, 'node_modules');
var srcPath = path.resolve(projectRootPath, 'src');

module.exports = {
    resolve: {
        alias: {
            'react': path.join(nodeModulesPath, 'react'),
            'react-dom': path.join(nodeModulesPath, 'react-dom'),
        }
    },

    module: {
        loaders: [
            {
                test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ],
    }
};
