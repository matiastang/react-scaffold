/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 16:49:59
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-26 17:13:46
 * @Description: babel配置
 */
const presets = [
    ["@babel/preset-env",
        {
            targets: {
                "chrome": "58",
                "ie": "11"
            },
            // 默认为 "auto". "false" 保持 es module 格式.
            modules: process.env.BABEL_ENV === 'esm' ? false : 'commonjs'
        }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
];
const plugins = [
    "react-hot-loader/babel"
    // ,
    // "@babel/plugin-transform-runtime"
];

module.exports = { presets, plugins };