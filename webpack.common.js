
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    title: process.env.NODE_ENV,
    template: 'assets/index.html',
    filename: 'index.html',
    inject: 'body'
});
const cssPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
});
module.exports = {
    performance: {
        hints: false,
        maxAssetSize: 100000,
        maxEntrypointSize: 300000
      },
    entry: {
        app: './app/index.jsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'opro.1.1.0.min.js',
        publicPath: '/',
    },
    optimization: {
            splitChunks: {
              chunks: 'all'
             }
   },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./fonts/[name].[ext]',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [new CleanWebpackPlugin(['dist']), htmlPlugin, cssPlugin],
};
