/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:42:31
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 15:14:44
 * @Description: WebGL 设置渐变三角形
 */
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL, { getWebGLContext } from '../utils/shaderUtils';
import { vertexShader, fragmentShader } from '../shader/webGLShader5';
import imageURL from '../img/danzai.png';

function WebGL5() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas5');
        // const gl = canvas.getContext('webgl');
        const gl = getWebGLContext(canvas);

        // // 设置清空颜色缓冲区时的颜色
        // gl.clearColor(1.0, 1.0, 1.0, 1.0);

        // // 清空颜色缓冲区
        // gl.clear(gl.COLOR_BUFFER_BIT);

        // 初始化shader程序
        const program = initWebGL(gl, vertexShader, fragmentShader);
        // 告诉WebGL使用我们刚刚初始化的这个程序
        gl.useProgram(program);

        // 获取shader中a_position的地址
        const a_position = gl.getAttribLocation(program, 'a_position');

        // 将顶点的位置数据修改为：
        const pointPos = [
            -1, 1,
            -1, -1,
            1, -1,
            1, -1,
            1, 1,
            -1, 1
        ];
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);

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

        // 获取shader中a_texCoord的地址
        const a_texCoord = gl.getAttribLocation(program, 'a_texCoord');
        // 给顶点增加对应的纹理坐标信息
        const texCoordPos = [
            0, 1,
            0, 0,
            1, 0,
            1, 0,
            1, 1,
            0, 1
        ];

        const texBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordPos), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
        gl.vertexAttribPointer(
            a_texCoord,
            2,
            gl.FLOAT,
            false,
            Float32Array.BYTES_PER_ELEMENT * 2,
            0
        );
        // 这是将shader中的a_color与colorBuffer绑定起来
        gl.enableVertexAttribArray(a_texCoord);

        // 创建纹理
        let texture = gl.createTexture();
        // 绑定纹理
        gl.bindTexture(gl.TEXTURE_2D, texture);

        let image = document.createElement('img');
        image.src = imageURL;
        // 传递纹理数据
        image.onload = function() {
            console.log('图片加载完成');

            // 这告诉WebGL如果纹理需要被缩小时，采用线性插值的方式来进行采样
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            // 这告诉WebGL如果纹理需要被方法时，采用线性插值的方式来进行采样
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            // 告诉WebGL如果纹理坐标超出了s坐标的最大/最小值，直接取边界值
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            // 告诉WebGL如果纹理坐标超出了t坐标的最大/最小值，直接取边界值
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };

        // let image = document.createElement('img');
        // image.src = imageURL;
        // // 传递纹理数据
        // image.onload = function() {
        //     console.log('图片加载完成');
        // };
        // document.body.appendChild(image);
    });

    return (
        <canvas id="canvas5" width="500" height="250"></canvas>
        // <canvas id="canvas5" width="250" height="500"></canvas>
    );
}

export default hot(WebGL5);