/*
 * @Author: tangdaoyong
 * @Date: 2021-04-22 17:28:56
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-26 14:08:58
 * @Description: webpack开发配置
 */
const path = require('path');
const webpack = require('webpack');
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/*
使用forkTsCheckerServiceBeforeStart钩子将类型检查推迟到编译完成之后，以便拾取由加载程序动态生成的类型。在这种情况下，编译将在forkTsCheckerServiceBeforeStart解决之前完成。
*/
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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

/*
[延迟类型检查](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#plugin-hooks)
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const compiler = webpack({
  // ... webpack config
});

// optionally add the plugin to the compiler
// **don't do this if already added through configuration**
new ForkTsCheckerWebpackPlugin().apply(compiler);

// now get the plugin hooks from compiler
const hooks = ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler);

// say we want to show some message when plugin is waiting for issues results
hooks.waiting.tap('yourListenerName', () => {
  console.log('waiting for issues');
});
*/

// require the plugin
// setup compiler with the plugin
const compiler = webpack({
    entry: {
        app: ENTRYPATH
    },
    devtool: 'inline-source-map',
    plugins: [
        // 为了避免webpack因为生成众多的scss.d.ts而导致速度变慢
        // new webpack.WatchIgnorePlugin({
        //     paths: [/.css\.d\.ts$/, /.scss\.d\.ts$/, /.less\.d\.ts$/]
        // }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
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
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/, // 匹配 css 文件
                include: /src/,
                use: [
                    {
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
});
// Optionally add the plugin to the compiler
// **Don't do this if already added through configuration**
/*
async?: boolean;
typescript?: TypeScriptReporterOptions;
eslint?: EsLintReporterOptions;
formatter?: FormatterOptions;
issue?: IssueOptions;
logger?: LoggerOptions;
*/
new ForkTsCheckerWebpackPlugin({
    async: true,
    eslint: ESLintOptions
}).apply(compiler);
// Now get the plugin hooks from compiler
const tsCheckerHooks = ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler);
// These hooks provide access to different events
// =================================================== //
// The properties of tsCheckerHooks corresponds to the //
// Hook Access Key of the table above.                 //
// =================================================== //
// Example, if we want to run some code when plugin has received diagnostics
/*
挂钩键	类型	参量	描述
start	AsyncSeriesWaterfallHook	change, compilation	开始检查编译的问题。这是一个异步瀑布钩，因此您可以修改已更改和已删除文件的列表或延迟服务的启动。
waiting	SyncHook	compilation	等待问题检查。
canceled	SyncHook	compilation	检查编译的问题已被取消。
error	SyncHook	compilation	问题检查期间发生错误。
issues	SyncWaterfallHook	issues, compilation	已收到问题，将予以报告。这是一个瀑布钩，因此您可以修改收到的问题列表。
*/
tsCheckerHooks.start.tap('yourListenerName', () => {
    console.log('start');
});
tsCheckerHooks.waiting.tap('yourListenerName', () => {
    console.log('waiting for typecheck results');
});
tsCheckerHooks.canceled.tap('yourListenerName', () => {
    console.log('canceled');
});
tsCheckerHooks.error.tap('yourListenerName', (error) => {
    console.log('error');
    console.log(error);
});
tsCheckerHooks.issues.tap('yourListenerName', () => {
    console.log('issues');
});