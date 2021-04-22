/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 17:23:32
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-22 17:01:37
 * @Description: Css测试
 */
import React from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import cssStyles from './testCss.css';
import scssStyles from './testScss.scss';
import lessStyles from './testLess.less';

const TestCss = () => {
    return (
        <>
            <div className={cssStyles.testCss}>Css测试，字体颜色为红色</div>
            <div className={scssStyles.testScss}>SCss测试，字体颜色为黄绿</div>
            <div className={lessStyles.testLess}>Less测试，字体颜色为灰色</div>
        </>
    );
};

export default hot(TestCss);