/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 17:23:32
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-20 17:52:21
 * @Description: Css测试
 */
import React from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import cssStyles from './styles/testCss.css';
import scssStyles from './styles/testScss.scss';
import lessStyles from './styles/testLess.less';

const TestCss = () => {
    return (
        <>
            <div className={cssStyles.testCss}>Css测试，字体颜色为红色</div>
            <div className={scssStyles.testCss}>SCss测试，字体颜色为黄绿</div>
            <div className={lessStyles.testCss}>Less测试，字体颜色为灰色</div>
        </>
    );
}

export default hot(TestCss);