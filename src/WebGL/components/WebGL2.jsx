/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 10:12:35
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 16:50:30
 * @Description: WebGL 设置点
 */
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL from '../utils/shaderUtils';
import { vertexShader, fragmentShader } from '../shader/webGLShader2';

function WebGL2() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas2');
        const gl = canvas.getContext('webgl');

        // 设置清空颜色缓冲区时的颜色
        gl.clearColor(1.0, 1.0, 0.0, 1.0);

        // 清空颜色缓冲区
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 初始化shader程序
        const program = initWebGL(gl, vertexShader, fragmentShader);
        // 告诉WebGL使用我们刚刚初始化的这个程序
        gl.useProgram(program);
        // 获取shader中a_position的地址
        const a_position = gl.getAttribLocation(program, 'a_position');
        // 往a_position这个地址中传值
        gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0);

        // 开始绘制，绘制类型是gl.POINTS绘制点，0表示第一个点的索引，1表示共绘制几个点
        gl.drawArrays(gl.POINTS, 0, 1);
    });

    return (
        <canvas id="canvas2" width="500" height="500"></canvas>
    );
}

export default hot(WebGL2);