/*
 * @Author: tangdaoyong
 * @Date: 2021-04-26 14:12:52
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-26 15:39:21
 * @Description: file content
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

var WebpackCheckerCss = function(options) {
    this.options = options;
    console.log(this.options);
    // console.log(ForkTsCheckerWebpackPlugin);
    // this.forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(this.options);
    // console.log(this.forkTsCheckerWebpackPlugin);
};

WebpackCheckerCss.prototype.apply = function(compiler) {

    compiler.hooks.emit.tap('webpackCheckerCss', compilation => {
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
        console.log(compiler);
        new ForkTsCheckerWebpackPlugin({
            async: true
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
    });
};

module.exports = WebpackCheckerCss;