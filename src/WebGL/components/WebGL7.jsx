/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:42:31
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-14 11:19:18
 * @Description: WebGL 图片灰度处理
 */
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import initWebGL, { getWebGLContext, initShader, createProjectionMat, rotatMatrix, zoomMatrix, translationMatrix } from '../utils/shaderUtils';
import imageURL from '../img/danzai.png';
/*
vsFile、fsFile当成资源文件加载。
{
    test: /\.(png|svg|jpg|jpeg|gif|glsl)$/i,
    type: 'asset/resource'
}
*/
import vsFile from '../shader/vertexShader/vShader7.glsl';
import fsFile from '../shader/fragmentShader/fShader7.glsl';
// import vsShader from '../shader/vertexShader/vShader7';
// import fsShader from '../shader/fragmentShader/fShader7';

// import { GlslShader, GlslVariable, GlslVariableMap } from 'webpack-glsl-minify';
 
// let shader = require('./myshader.glsl') as GlslShader;
// import vsShader from '../shader/vertexShader/vShader7.glsl';
// import fsShader from '../shader/fragmentShader/fShader7.glsl';
// const vsShader = require('glsl!../shader/vertexShader/vShader7.glsl');
// const fsShader = require('glsl!../shader/fragmentShader/fShader7.glsl');

// const vsShader = require('../shader/vertexShader/vShader7');
// const fsShader = require('../shader/fragmentShader/fShader7');

function WebGL7() {

    useEffect(() => {
        
        const canvas = document.getElementById('canvas7');
        const gl = getWebGLContext(canvas);

        initShader(gl, vsFile, fsFile).then((program) => {
            runWebGL(gl, program);
        });

        // console.log(vsShader);
        // console.log(fsShader);
        // // export interface GlslShader {
        // //     /** Minified GLSL code */
        // //     sourceCode: string;
        // //     /** Uniform variable names. Maps the original unminified name to its minified details. */
        // //     uniforms: GlslVariableMap;
        // //     /** Constant variables. Maps the orignal unminified name to the substitution value. */
        // //     consts: GlslVariableMap;
        // // }
        // let sp = initWebGL(gl, vsShader.sourceCode, fsShader.sourceCode);
        // gl.useProgram(sp);
        // runWebGL(gl, sp);
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
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };
    };

    return (
        <canvas id="canvas7" width="500" height="500"></canvas>
    );
}

export default hot(WebGL7);