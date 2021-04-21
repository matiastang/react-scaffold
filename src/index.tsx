/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 15:56:46
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-20 17:12:16
 * @Description: 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './routers/Root';
// import { ConfigProvider } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';

// 绑定
ReactDOM.render(
    // <ConfigProvider locale={ zh_CN }>
    //     <Root />
    // </ConfigProvider>,
    <Root />,
    document.getElementById('app')
);