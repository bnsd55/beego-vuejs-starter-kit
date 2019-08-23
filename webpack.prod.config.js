const path = require('path');
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname);
const cleanDistFolderPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const productionGzip = false

const webpackConfig = {
    entry: './static/js/index.js',
    output: {
        filename: '[name].js',
        path: path.join(projectRoot, 'dist')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, 'static/js'),
            'css': path.resolve(__dirname, 'static/css/index.scss'),
            'components': path.resolve(__dirname, 'static/js/components')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            }],
                            fallback: 'vue-style-loader'
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            }, {
                                loader: 'sass-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true,
                                    indentedSyntax: true
                                }
                            }],
                            fallback: 'vue-style-loader'
                        }),
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    }],
                    fallback: 'vue-style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join("dist", 'img/[name].bundle.[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join("dist", 'media/[name].bundle.[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join("dist", 'fonts/[name].bundle.[ext]')
                }
            }
        ]
    },
    plugins: [
		new VueLoaderPlugin(),
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } }), // production | development        
        new cleanDistFolderPlugin(['dist']),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin({ filename: "[name].css" }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'static/index.html'),
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
            },
            chunks: ['vendor', 'manifest', 'main'],
            chunksSortMode: 'none',
            hash: true,
            showErrors: true
        }),
        new MinifyPlugin({}, {
            comments: false
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions:
                { safe: true, map: { inline: false } }
        })
    ]
};

// if need to zip the sourcecode in production
if (productionGzip) {
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                ['js', 'css'].join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    ])
}

module.exports = webpackConfig