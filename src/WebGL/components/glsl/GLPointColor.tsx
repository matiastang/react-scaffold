/*
 * @Author: tangdaoyong
 * @Date: 2020-12-25 14:28:12
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-20 16:37:38
 * @Description: WebGL GLSL gl_PointColor
 */
// import { message } from 'antd';
import { hot } from 'react-hot-loader/root';// 引入hot
import React, { useEffect } from 'react';
import getWebGLContext, { getWebGLProgram } from '../../utils/ts/shaderUtils';
// import { unitMatrix, rotatMatrix, rotatXMatrix, rotatYMatrix, rotatZMatrix, zoomMatrix, translationMatrix } from '../../utils/ts/shaderConst.ts';
// import vsFile from '../../shader/vertexShader/GLPointColors.vert';
// import fsFile from '../../shader/fragmentShader/GLPointColors.frag';
// import { shaderURL } from 'glslShader';

import { GlslShader, GlslVariable, GlslVariableMap } from 'webpack-glsl-minify';

const vsFile = require('../../shader/vertexShader/GLPointColors.vert') as GlslShader;
const fsFile = require('../../shader/fragmentShader/GLPointColors.frag') as GlslShader;

const GLPointColors = () => {

    useEffect(() => {
        
        console.log(vsFile);
        console.log(fsFile);

        const canvas = document.getElementById('GL_PointColors');
        if (canvas === null) {
            // TODO: - 错误提示
            console.log('canvas error');
            return;
        }
        const gl = getWebGLContext(canvas as HTMLCanvasElement, null);
        if (gl === null) {
            // TODO: - 错误提示
            console.log('gl error');
            return;
        }
        console.log(gl);
        let program = getWebGLProgram(gl, vsFile.sourceCode, fsFile.sourceCode);
        gl.useProgram(program);
        
        // 获取shader中a_position的地址
        const a_position = gl.getAttribLocation(program, 'a_position');

        // 将顶点的位置数据修改为：
        let pointPos = [
            0.5, -0.5,
            -0.5, -0.5,
            0, 0,
            -0.5, 0.5,
            0.5, 0.5
        ];

        const buffer = gl.createBuffer();
   
        // 这是将shader中的a_position与buffer绑定起来
        gl.enableVertexAttribArray(a_position);

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

        gl.drawArrays(gl.POINTS, 0, 5);
    });

    return (
        <canvas id="GL_PointColors" width="500" height="500"></canvas>
    );
};

export default hot(GLPointColors);