const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

// UTILS
const __base = path.resolve(__dirname, '..');
const __src = path.resolve(__base, 'src');

module.exports = {
    // ENTRYPOINT
    entry: {
        app: path.resolve(__src, 'main.js'),
    },

    // GENERAL PLUGINS
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack configurations',
            
          //  favicon: path.resolve(__src, 'static', 'favicon.ico'),
            template: path.resolve(__src, 'templates', 'index.html'),
        }),
        new VueLoaderPlugin(),
    ],

    // GENERAL RULES
    module: {
        rules: [
            // VUE FILES
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },

            // // TYPESCRIPT FILES
            // {
            //     test: /\.ts$/,
            //     loader: 'ts-loader',
            //     exclude: /node_modules/,
            //     options: {
            //         appendTsSuffixTo: [/\.vue$/],
            //     },
            // },

            // IMAGE FILES
            {
                test: /\.png$/,
                type: 'asset/resource',
            },
        ],
    },

    // ENDPOINT
    output: {
        filename: '[    ].bundle.js',
        path: path.resolve(__base, 'dist'),
        clean: true,
    },
};