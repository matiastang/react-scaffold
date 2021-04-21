/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 10:03:22
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 10:07:41
 * @Description: WebGL 设置背景颜色
 */
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot

function WebGL1() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas');
        const gl = canvas.getContext('webgl');

        // 设置清空颜色缓冲区时的颜色
        gl.clearColor(1.0, 1.0, 0.0, 1.0);

        // 清空颜色缓冲区
        gl.clear(gl.COLOR_BUFFER_BIT);
    });

    return (
        <canvas id="canvas" width="500" height="500"></canvas>
    );
}

export default hot(WebGL1);