/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:42:31
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 13:56:25
 * @Description: WebGL 设置渐变三角形
 */
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL from '../utils/shaderUtils';
import { vertexShader, fragmentShader } from '../shader/webGLShader4';

function WebGL4() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas4');
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
        // gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0);
        // 获取shader中a_color的地址
        const a_color = gl.getAttribLocation(program, 'a_color');

        // const pointPos = [
        //     -0.5, 0.0, 1.0, 0.0, 0.0, 1.0,
        //     0.5, 0.0, 0.0, 1.0, 0.0, 1.0,
        //     0.0, 0.5, 0.0, 0.0, 1.0, 1.0
        // ];
        // const buffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // // -----------------------------------------------------
        // // 注意：这里必须采用类型化数组往WebGL传入attribute类型的数据
        // // -----------------------------------------------------
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);
        // // 采用vertexAttribPointer进行传值[WebGLRenderingContext.vertexAttribPointer()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/vertexAttribPointer)
        // gl.vertexAttribPointer(
        //     a_position,
        //     2,
        //     gl.FLOAT,
        //     false,
        //     Float32Array.BYTES_PER_ELEMENT * 6,
        //     0
        // );

        // gl.vertexAttribPointer(
        //     a_color,
        //     4,
        //     gl.FLOAT,
        //     false,
        //     Float32Array.BYTES_PER_ELEMENT * 6,
        //     Float32Array.BYTES_PER_ELEMENT * 2
        // );
        // gl.enableVertexAttribArray(a_position);

        const pointPos = [-0.5, 0.0, 0.5, 0.0, 0.0, 0.5];
        const pointColor = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0];

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointColor), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(
            a_position,
            2,
            gl.FLOAT,
            false,
            Float32Array.BYTES_PER_ELEMENT * 2,
            0
        );
        // 这是将shader中的a_position与buffer绑定起来
        gl.enableVertexAttribArray(a_position);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(
            a_color,
            4,
            gl.FLOAT,
            false,
            Float32Array.BYTES_PER_ELEMENT * 4,
            0
        );
        // 这是将shader中的a_color与colorBuffer绑定起来
        gl.enableVertexAttribArray(a_color);

        // // 这一句话是告诉WebGL，在shader中的a_position这个变量读取的是当前WebGLBuffer的内容。
        // gl.enableVertexAttribArray(a_position);
        // gl.enableVertexAttribArray(a_color);

        // 开始绘制，绘制类型是gl.POINTS绘制点，0表示第一个点的索引，1表示共绘制几个点
        // gl.drawArrays(gl.POINTS, 0, 3);

        // 绘制三角形
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });

    return (
        <canvas id="canvas4" width="500" height="500"></canvas>
    );
}

export default hot(WebGL4);