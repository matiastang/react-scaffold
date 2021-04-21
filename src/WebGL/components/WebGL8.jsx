/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:42:31
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-14 16:13:15
 * @Description: WebGL 图片灰度处理
 */
import React, { useCallback, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL, { getWebGLContext, initShader, createProjectionMat } from '../utils/shaderUtils';
import { unitMatrix, rotatMatrix, rotatXMatrix, rotatYMatrix, rotatZMatrix, zoomMatrix, translationMatrix } from '../utils/shaderConst';
import imageURL from '../img/danzai.png';
/*
vsFile、fsFile当成资源文件加载。
{
    test: /\.(png|svg|jpg|jpeg|gif|glsl)$/i,
    type: 'asset/resource'
}
*/
import vsFile from '../shader/vertexShader/vertex8.vert';
import fsFile from '../shader/fragmentShader/fragment8.frag';

function WebGL8() {

    // 上次绘制的时间
    var glLastTime = null;// 上次绘制的时间
    var glSpeed = Math.PI / 4;// 旋转角速度
    // [glLastTime, setGLLaatTime] = useState(null);

    useEffect(() => {
        
        const canvas = document.getElementById('canvas8');
        const gl = getWebGLContext(canvas);

        initShader(gl, vsFile, fsFile).then((program) => {
            runWebGL(gl, program);
        });
    });

    /**
     * @description: 
     * @param {*}
     * @return {*}
     */
    const runWebGL = (gl, program) => {

        // 获取shader中a_position的地址
        const a_position = gl.getAttribLocation(program, 'a_position');

        // 将顶点的位置数据修改为：
        let pointPos = [
            0, 661,
            0, 0,
            661, 0,
            661, 0,
            661, 661,
            0, 661
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

        // 先获取u_projection在shader的位置
        const u_projection = gl.getUniformLocation(program, 'u_projection');
        // 生成坐标变换矩阵
        const projectionMat = createProjectionMat(0, 661, 661, 0, 0, 1);
        // const projectionMat = rotatMatrix(Math.PI / 2);
        // const projectionMat = zoomMatrix(1, 0.5, 1);
        // const projectionMat = translationMatrix(0.5, 0.0, 0.0);
        // 传入数据
        gl.uniformMatrix4fv(u_projection, false, projectionMat);

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
            // gl.drawArrays(gl.TRIANGLES, 0, 6);

            const rad_projection = gl.getUniformLocation(program, 'rad_projection');
            // var speed = Math.PI / 4;// 角速度
            var rad = 0.0;// 启始角度
            var tick = function(timestamp) {
                var delta = glLastTime ? (timestamp - glLastTime) / 1000 : 0;// 上次绘制到本次绘制过去的时间(单位转换算成秒)
                // setGLLaatTime(timestamp);// 保存本次时间
                glLastTime = timestamp;
                rad = (rad + glSpeed * delta) % (2 * Math.PI);// 当前的弧度
                draw(gl, 6, rad, rad_projection);
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);// 请求调用tick
        };
    };

    function draw(gl, n, rad, u_Mat) {
        gl.uniformMatrix4fv(u_Mat, false, getRotationMatrix(rad, 0, 0, 1));// 设置顶点着色器中变量的值
        // gl.clear(gl.COLOR_BUFFER_BIT);// 清空canvas
        gl.drawArrays(gl.TRIANGLES, 0, n);// 绘制
    }

    function getRotationMatrix(rad, x, y, z) {
        return rotatZMatrix(rad);
        // if (x > 0) {
        //     // 绕x轴的旋转矩阵
        //     return new Float32Array([
        //         1.0, 0.0, 0.0, 0.0,
        //         0.0, Math.cos(rad), -Math.sin(rad), 0.0,
        //         0.0, Math.sin(rad), Math.cos(rad), 0.0,
        //         0.0, 0.0, 0.0, 1.0
        //     ]);
        // } else if (y > 0) {
        //     // 绕y轴的旋转矩阵
        //     return new Float32Array([
        //         Math.cos(rad), 0.0, -Math.sin(rad), 0.0,
        //         0.0, 1.0, 0.0, 0.0,
        //         Math.sin(rad), 0.0, Math.cos(rad), 0.0,
        //         0.0, 0.0, 0.0, 1.0
        //     ]);
        // } else if (z > 0) {
        //     // 绕z轴的旋转矩阵
        //     return new Float32Array([
        //         Math.cos(rad), Math.sin(rad), 0.0, 0.0,
        //         -Math.sin(rad), Math.cos(rad), 0.0, 0.0,
        //         0.0, 0.0, 1.0, 0.0,
        //         0.0, 0.0, 0.0, 1.0
        //     ]);
        // }
        // // 没有指定旋转轴，报个错，返回一个单位矩阵
        // console.error('error: no axis');
        // return new Float32Array([
        //     1.0, 0.0, 0.0, 0.0,
        //     0.0, 1.0, 0.0, 0.0,
        //     0.0, 0.0, 1.0, 0.0,
        //     0.0, 0.0, 0.0, 1.0
        // ]);
    }

    const addSpeed = useCallback(() => {
        glSpeed += Math.PI / 8;
    });

    const minusSpeed = useCallback(() => {
        glSpeed -= Math.PI / 8;
    });

    return (
        <>
            <canvas id="canvas8" width="500" height="500"></canvas>
            <button onClick={ addSpeed }>加速</button>
            <button onClick={ minusSpeed }>减速</button>
        </>
    );
}

export default hot(WebGL8);