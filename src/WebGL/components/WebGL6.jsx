/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:42:31
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 17:22:32
 * @Description: WebGL 设置渐变三角形
 */
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL, { getWebGLContext, createProjectionMat, rotatMatrix, zoomMatrix, translationMatrix } from '../utils/shaderUtils';
import { vertexShader, fragmentShader } from '../shader/webGLShader6';
import imageURL from '../img/danzai.png';

function WebGL6() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas6');
        // const gl = canvas.getContext('webgl');
        const gl = getWebGLContext(canvas);

        // 设置清空颜色缓冲区时的颜色
        gl.clearColor(1.0, 1.0, 1.0, 1.0);

        // 清空颜色缓冲区
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 初始化shader程序
        const program = initWebGL(gl, vertexShader, fragmentShader);
        // 告诉WebGL使用我们刚刚初始化的这个程序
        gl.useProgram(program);

        // 获取shader中a_position的地址
        const a_position = gl.getAttribLocation(program, 'a_position');

        // 将顶点的位置数据修改为：
        // const pointPos = [
        //     -1, 1,
        //     -1, -1,
        //     1, -1,
        //     1, -1,
        //     1, 1,
        //     -1, 1
        // ];
        let pointPos = [
            0, 661,
            0, 0,
            661, 0,
            661, 0,
            661, 661,
            0, 661
        ];
        pointPos = convertPoints(pointPos, 661, 661);
        console.log(pointPos);
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

        // // 先获取u_projection在shader的位置
        // const u_projection = gl.getUniformLocation(program, 'u_projection');
        // // 生成坐标变换矩阵
        // const projectionMat = createProjectionMat(0, 661, 661, 0, 0, 1);
        // // const projectionMat = rotatMatrix(Math.PI / 2);
        // // const projectionMat = zoomMatrix(1, 0.5, 1);
        // // const projectionMat = translationMatrix(0.5, 0.0, 0.0);
        // // 传入数据
        // gl.uniformMatrix4fv(u_projection, false, projectionMat);

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

    const convert = (l, r) => {
        return (cordinate) => {
            return (2 * cordinate) / (r - l) - (r + l) / (r - l);
        };
    };

    const convertPoints = (points, width, height) => {

        const convertX = convert(0, width);
        const convertY = convert(0, height);

        let newPoints = [];
        for (let i = 0; i < points.length; i += 2) {
            newPoints.push(convertX(points[i]));
            newPoints.push(convertY(points[i + 1]));
            // points[i] = convertX(points[i]);
            // points[i + 1] = convertY(points[i + 1]);
        }
        return newPoints;
    };

    return (
        // <canvas id="canvas6" width="500" height="250"></canvas>
        <canvas id="canvas6" width="750" height="500"></canvas>
    );
}

export default hot(WebGL6);