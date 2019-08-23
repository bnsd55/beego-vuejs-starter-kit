const path = require('path');
const webpack = require('webpack')
const pkg = require('./package.json')
const projectRoot = path.resolve(__dirname);
const cleanDistFolderPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const notifier = require('node-notifier')
const WriteFileWebPackPlugin = require('write-file-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const devServerHost = process.env.HOST || 'localhost'
const devServerPort = process.env.PORT || '8000'

module.exports = {
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
    devServer: {
        host: devServerHost,
        port: devServerPort,
        contentBase: path.join(__dirname, "dist"),
    },
    devtool: "cheap-module-eval-source-map",
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
                                    minimize: false,
                                    sourceMap: false
                                }
                            }],
                            fallback: 'vue-style-loader'
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: false,
                                    sourceMap: false
                                }
                            }, {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: false,
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
                            minimize: false,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
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
        new WriteFileWebPackPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your web application is running here: http://${devServerHost}:${devServerPort}`],
            },
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                    return
                }
                const error = errors[0]
                const filename = error.file.split('!').pop()
                notifier.notify({
                    title: pkg.name,
                    message: severity + ': ' + error.name,
                    subtitle: filename || ''
                })
            }
        })
    ]
};