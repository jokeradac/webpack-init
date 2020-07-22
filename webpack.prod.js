// Carga del paquete html-webpack
const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
const TerserPlugin            = require('terser-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin'); //Desestructuracion de paquetes
module.exports = {

    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [ new OptimizeCssAssetsPlugin(), new TerserPlugin({ test: /\.js(\?.*)?$/i, }) ]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //loader: "babel-loader"
                loader: [ 'babel-loader' ] 
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'  
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'  
                ]                
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false, // Minifica los archivos
                    attributes: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            //hash: true,
            template: 'index.html',
            filename: 'index.html' //[name].[contenthash].html
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[contentHash].css', // [name].[contentHash].css
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [ { from: 'src/assets', to: 'assets/'} ]
        }),

        new CleanWebpackPlugin()
    ]
}