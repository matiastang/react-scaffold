/*
 * @Author: tangdaoyong
 * @Date: 2020-11-24 17:24:53
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-26 15:48:44
 * @Description: webpack配置
 */
const path = require('path');
const webpack = require('webpack');
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
/*
parallel-webpack：它允许在一个 worker 池中运行 compilation。并行构建
cache-loader：可以在多个 compilation 之间共享缓存。
生成 HTML 模版 (html-webpack-plugin)
自动压缩图片 (imagemin-webpack-plugin) 
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 常量

// 入口
const ENTRYPATH = path.resolve(__dirname, './src/index.tsx');
// 出口
const OUTPUTPATH = path.resolve(__dirname, './dist');

// ESLint 选项
const ESLintOptions = {
    // context: '', // 指示文件根目录的字符串。
    // eslintPath: '',// eslint将用于皮棉的实例的路径。如果eslintPath是官方eslint之类的文件夹，请指定一个formatter选项。现在您无需安装eslint。
    extensions: ['js'], // 指定应检查的扩展名。
    exclude: ['node_modules'], // 指定要排除的文件和/或目录。必须相对于options.context
    files: [path.resolve(__dirname, 'src')], // 指定目录，文件或全局名称。必须相对于options.context。目录遍历遍历以寻找匹配的文件options.extensions。文件和全局模式忽略options.extensions。
    fix: true, // 将启用ESLint自动修复功能。
    formatter: require('eslint-friendly-formatter') // 接受一个具有一个参数的函数：eslint消息（对象）的数组。该函数必须以字符串形式返回输出。您可以使用官方的eslint格式化程序。
    // lintDirtyModulesOnly: false, // 仅清除更改的文件，在启动时跳过lint。
    // threads: false, // 将在线程池中运行lint任务。除非指定数字，否则池大小是自动的。
};

/* - 自定义webpack插件 - */

const WebpackCheckerCss = require('./src/plugins/ts-checker-css');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: ENTRYPATH
    },
    devtool: 'inline-source-map',
    plugins: [
        // 为了避免webpack因为生成众多的scss.d.ts而导致速度变慢
        new webpack.WatchIgnorePlugin({
            paths: [/.css\.d\.ts$/, /.scss\.d\.ts$/, /.less\.d\.ts$/]
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        /*
        [fork-ts-checker-webpack-plugin报错信息不及时](https://segmentfault.com/q/1010000019545436)
        fork一个进程进行检查，并设置async为false，将错误信息反馈给webpack
        因为fork-ts-checker-webpack-plugin是在单独的进程跑的，所以它的错误或警告信息是异步回传给到webpack进程的。而当webpack自己处理完转译任务后，会将结果同步报告给浏览器去显示。这个会导致报错信息不及时。
        将async设置为false后，就要求webpack等待fork-ts-checker-webpack-plugin进程返回信息。不过这样做也可能会拖慢整个webpack的转译等待时间。这就要看怎么选择了
        */
        // new WebpackCheckerCss({
        //     async: true,
        //     eslint: ESLintOptions
        // }),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            eslint: ESLintOptions
        }),
        new ForkTsCheckerNotifierWebpackPlugin({
            title: 'webpack TypeScript',
            alwaysNotify: false
        }),
        new HtmlWebpackPlugin({ // 处理 html，配置多个会生成多个 html
            title: 'React学习', // html的标题
            filename: './index.html', // 生成的 html 文件
            template: './public/index.html', // 使用的 html 模版
            favicon: '', // html页面图标
            inject: 'body', // script标签的未知，body,head,true(同body),false
            hash: true, // 给js生成hash值
            showErrors: true, // 显示错误信息
            minify: { // 压缩HTML文件
                minifyJS: true,  // 压缩内联js
                minifyCSS: true, // 压缩内联css
                removeComments: true, // 移除HTML中的注释
                removeCommentsFromCDATA: true, // 从脚本和样式删除的注释
                removeRedundantAttributes: true, // 删除多余的属性
                collapseWhitespace: true // 删除空白符与换行符
            }
        })
    ],
    output: {
        path: OUTPUTPATH,      // 出口路径
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['*', '.tsx', '.ts', '.js', '.jsx', '.svg', '.css', '.scss', '.less', '.vert', '.tesc', '.tese', '.geom', '.frag', '.comp'],
        alias: { // 别名
            services: path.resolve(__dirname, 'src/services/'),
            glslShader: path.resolve(__dirname, 'src/WebGL/shader/')
        }
    },
    module: { // 加载器
        rules: [// 规则
            {
                test: /\.js|jsx$/,            // 匹配文件
                exclude: /node_modules/,      // 排除文件夹
                use: [
                    { loader: 'babel-loader' } // babel 加载器
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'ts-loader',
                    options: {
                        // 关闭类型校验：disable type checker - we will use it in fork plugin
                        transpileOnly: true
                        /*
                        transpileOnly: false 单进程，只使用ts-loader进行'转译'和‘类型检查’(单进程因为是同步所以webpack可以收集错误信息，并通过dev-server反馈到浏览器)
                        transpileOnly: true 则关闭类型检查，即只进行转译
                        */
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/, // 匹配 css 文件
                include: /src/,
                use: [
                    {
                        // fallback to style-loader in development
                        // loader: process.env.NODE_ENV !== 'production' ? 'style-loader': MiniCssExtractPlugin.loader,
                        loader: 'style-loader'
                    },
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                        options: {
                            // css-loader相关参数在css-loader中设置：pass all the options for `css-loader` to `css-loader`, eg.
                            formatter: 'prettier'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]'
                            },
                            sourceMap: true,
                            importLoaders: 2
                        }
                    }
                ]
            },
            {
                test: /\.(s(a|c)|le)ss$/,
                include: /src/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: '@teamsupercell/typings-for-css-modules-loader', // @teamsupercell/typings-for-css-modules-loader 生成样式的类型声明文件 typings-for-css-modules-loader让我们可以像使用js模块一样引入css和scss文件。
                    options: {
                        formatter: 'prettier'
                    }
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]_[hash:base64:5]'
                        },
                        sourceMap: true,
                        importLoaders: 2
                    }
                }, {
                    loader: 'sass-loader'// 处理`.scss`、`.less`文件，需要依赖`node-sass`包。
                }, {
                    loader: 'postcss-loader'
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                /*
                * .vert - 顶点着色器
                * .tesc - 曲面细分控制着色器
                * .tese - 曲面细分评估着色器
                * .geom - 几何着色器
                * .frag - 片段着色器
                * .comp - 计算着色器
                */
                test: /\.(vert|tesc|tese|geom|frag|comp|glsl)$/i,
                use: ['webpack-glsl-minify']
            }
        ]
    },
    devServer: { // 配置 webpack-dev-server
        host: 'localhost',
        port: 3000,
        open: true,
        contentBase: OUTPUTPATH,
        historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        compress: true // 压缩
    }
};