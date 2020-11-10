const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    // entry: './src/test.js',

    // 多个入口文件
    entry: {
        main: './src/home.js',
        // about: './src/about.js',
    },
    output: {
        // 使用以下代码，dist目录会生成到webpack.config.js所在的目录下
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(process.cwd(), 'dist'),

        // 使用hash是为了上线更新的时候避免有缓存
        // filename: '[name].[hash:8].js',
        filename: 'static/js/[name].[chunkHash:8].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkHash:8].css',
            chunkFilename: '[id].css',
        }),

        new CopyPlugin([{
            from: path.resolve(process.cwd(), 'src/common/'),
            to: path.resolve(process.cwd(), 'dist/static/'),
        }, ]),
    ],

    module: {
        // 从下往往上执行
        rules: [{
                test: /\.css$/i,
                // 后写的loader先执行，也就是先执行css-loader，后执行style-loader
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/i,
                // 后写的loader先执行，也就是先执行css-loader，后执行style-loader
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    // 'less-loader',
                    {
                        loader: 'less-loader',
                        options: {},
                    },
                ],
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: 'static/images/[name].[ext]',
            //             // outputPath: 'static/images',
            //             publicPath: '/',
            //         },
            //     }, ],
            // },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 80,
                        name: 'static/images/[name].[ext]',
                        publicPath: '/',
                    },
                }, ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                    },
                },
            },
        ],
    },
    devServer: {
        port: 3000,
        // 自动启动
        open: true,
    },
}