/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 16:49:59
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-20 16:50:23
 * @Description: babel配置
 */
const presets = ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"];
const plugins = ["react-hot-loader/babel"];

module.exports = { presets, plugins };