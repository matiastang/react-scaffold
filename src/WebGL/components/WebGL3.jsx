/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 10:12:35
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 17:10:56
 * @Description: WebGL 设置多点
 */
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL, { getWebGLContext, rotatMatrix, zoomMatrix, translationMatrix } from '../utils/shaderUtils';
import { vertexShader, fragmentShader } from '../shader/webGLShader3';

function WebGL3() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas3');
        // const gl = canvas.getContext('webgl');
        const gl = getWebGLContext(canvas);

        // 设置清空颜色缓冲区时的颜色
        gl.clearColor(1.0, 1.0, 0.0, 1.0);

        // 清空颜色缓冲区
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 初始化shader程序
        const program = initWebGL(gl, vertexShader, fragmentShader);
        // 告诉WebGL使用我们刚刚初始化的这个程序
        gl.useProgram(program);

        // 先获取u_projection在shader的位置
        const u_projection = gl.getUniformLocation(program, 'u_projection');
        // 生成坐标变换矩阵
        const projectionMat = rotatMatrix(Math.PI / 2);
        // const projectionMat = zoomMatrix(0.5, 0.5, 0.5);
        // const projectionMat = translationMatrix(0.5, 0.5, 0.0);
        console.log(projectionMat);
        // 传入数据
        gl.uniformMatrix4fv(u_projection, false, projectionMat);

        // 获取shader中a_position的地址
        const a_position = gl.getAttribLocation(program, 'a_position');
        // 往a_position这个地址中传值
        // gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0);

        const pointPos = [
            -0.5, 0.0, 0.0, 1.0,
            0.5, 0.0, 0.0, 1.0,
            0.0, 0.5, 0.0, 1.0
        ];
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // -----------------------------------------------------
        // 注意：这里必须采用类型化数组往WebGL传入attribute类型的数据
        // -----------------------------------------------------
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);
        // 采用vertexAttribPointer进行传值[WebGLRenderingContext.vertexAttribPointer()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/vertexAttribPointer)
        gl.vertexAttribPointer(
            a_position,
            4,
            gl.FLOAT,
            false,
            Float32Array.BYTES_PER_ELEMENT * 4,
            0
        );

        // 这一句话是告诉WebGL，在shader中的a_position这个变量读取的是当前WebGLBuffer的内容。
        gl.enableVertexAttribArray(a_position);

        // 开始绘制，绘制类型是gl.POINTS绘制点，0表示第一个点的索引，1表示共绘制几个点
        gl.drawArrays(gl.POINTS, 0, 3);

        // 绘制三角形
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });

    return (
        <canvas id="canvas3" width="500" height="500"></canvas>
    );
}

export default hot(WebGL3);