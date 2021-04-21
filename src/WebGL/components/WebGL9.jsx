/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:42:31
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-14 17:28:44
 * @Description: WebGL 图片灰度处理
 */
import React, { useCallback, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL, { getWebGLContext, initShader, createProjectionMat, loadImages, loadImage } from '../utils/shaderUtils';
import { unitMatrix, rotatMatrix, rotatXMatrix, rotatYMatrix, rotatZMatrix, zoomMatrix, translationMatrix } from '../utils/shaderConst';
import imageURL from '../img/danzai.png';
import imageURL1 from '../img/QUIC-0RTT.png';
import vsFile from '../shader/vertexShader/vertex9.vert';
import fsFile from '../shader/fragmentShader/fragment9.frag';

function WebGL9() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas9');
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
            0, 1,
            0, 0,
            1, 0,
            1, 0,
            1, 1,
            0, 1
        ];
        // let pointPos = [
        //     0, 661,
        //     0, 0,
        //     661, 0,
        //     661, 0,
        //     661, 661,
        //     0, 661
        // ];
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
        // const u_projection = gl.getUniformLocation(program, 'u_projection');
        // 生成坐标变换矩阵
        // const projectionMat = createProjectionMat(0, 661, 661, 0, 0, 1);
        // const projectionMat = rotatMatrix(Math.PI / 2);
        // const projectionMat = zoomMatrix(1, 0.5, 1);
        // const projectionMat = translationMatrix(0.5, 0.0, 0.0);
        // 传入数据
        // gl.uniformMatrix4fv(u_projection, false, projectionMat);

        // // 创建纹理
        // let texture = gl.createTexture();
        // // 绑定纹理
        // gl.bindTexture(gl.TEXTURE_2D, texture);

        // let image = document.createElement('img');
        // image.src = imageURL;
        // // 传递纹理数据
        // image.onload = function() {
        //     console.log('图片加载完成');

        //     // 这告诉WebGL如果纹理需要被缩小时，采用线性插值的方式来进行采样
        //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        //     // 这告诉WebGL如果纹理需要被方法时，采用线性插值的方式来进行采样
        //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //     // 告诉WebGL如果纹理坐标超出了s坐标的最大/最小值，直接取边界值
        //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        //     // 告诉WebGL如果纹理坐标超出了t坐标的最大/最小值，直接取边界值
        //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        //     gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        //     gl.drawArrays(gl.TRIANGLES, 0, 6);
        // };
        
        let number = 6;
        initTextures(gl, number, program);
    };

    function initTextures(gl, n, program) {
        var u_texture_0 = gl.getUniformLocation(program, 'u_texture_0');
        var u_texture_1 = gl.getUniformLocation(program, 'u_texture_1');
    
        var image = new Image();
        var image1 = new Image();
    
        image.onload = function() {
            console.log(0);
            // const u_projection = gl.getUniformLocation(program, 'u_projection');
            // // 生成坐标变换矩阵
            // const projectionMat = createProjectionMat(0, 661, 661, 0, 0, 1);
            // // 传入数据
            // gl.uniformMatrix4fv(u_projection, false, projectionMat);
            loadTexture(gl, n, u_texture_0, image, 0);
        };
    
        image1.onload = function() {
            console.log(1);
            // const u_projection = gl.getUniformLocation(program, 'u_projection');
            // gl.uniformMatrix4fv(u_projection, false, zoomMatrix(0.5));
            loadTexture(gl, n, u_texture_1, image1, 1);
        };
    
        image.src = imageURL;
        image1.src = imageURL1;

        // let all = [];
        // let imagePromise = loadImage(element);
        // imagePromise.then((image) => {
            
        // })
        // all.push();
        // Promise.all(all).then((images) => {
            
        // })
    }

    var g_LoadImage = false;
    var g_LoadImage1 = false;

    function loadTexture(gl, n, u_Sampler, image, texUnit) {
        // gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // gl.clear(gl.COLOR_BUFFER_BIT);
    
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);// 图像坐标与纹理坐标Y轴方向相反，需进行Y轴反转
    
        var texture = gl.createTexture();// 创建纹理
        if (texUnit === 0) {
            gl.activeTexture(gl.TEXTURE0);// 激活0号纹理单元（0号是默认激活的纹理单元）
            g_LoadImage = true;
        } else {
            gl.activeTexture(gl.TEXTURE1);// 激活1号纹理单元（0号是默认激活的纹理单元）
            g_LoadImage1 = true;
        }
    
        gl.bindTexture(gl.TEXTURE_2D, texture);// 绑定纹理对象到激活的纹理单元
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);// 纹理放大方式
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);// 纹理缩小方式
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);// 纹理水平填充方式
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);// 纹理垂直填充方式
    
        // var color = (texUnit === 0) ? gl.RGB : gl.RGBA;
        // gl.texImage2D(gl.TEXTURE_2D, 0, color, color, gl.UNSIGNED_BYTE, image);// 配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    
        gl.uniform1i(u_Sampler, texUnit);
    
        if (g_LoadImage && g_LoadImage1) {
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
        }
    }

    return (
        <canvas id="canvas9" width="500" height="500"></canvas>
    );
}

export default hot(WebGL9);