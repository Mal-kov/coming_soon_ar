const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');



module.exports = {
    entry:['./src/index.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin()
        ]
    },
    devServer: {
        contentBase: __dirname + '/dist'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin( {
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyPlugin({
            patterns:[{
                // from: path.relative(__dirname,'src/images'), 
                // to: path.relative(__dirname, 'dist/images')
                from: './src/images', 
                to: 'images' 
                },
                // {
                //     from: './src/files', 
                //     to: 'files' 
                //     },
            ],

        }),

        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        
        // })

    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules:[
            // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        outputPath: 'images'
                    }  
                }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //include: path.resolve(__dirname, 'src/scss/fonts/'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    } 
                }]
            }

        ]
    }
    

}