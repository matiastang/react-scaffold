/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:43:26
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 17:21:00
 * @Description: WebGL5 纹理绘制图片
 */
// 顶点着色器
const vertexShader = `
    attribute vec4 a_position;
    // 纹理坐标信息
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    uniform mat4 u_projection;
    void main () {
        // gl_Position为内置变量，表示当前点的位置
        gl_Position = a_position;
        // gl_Position = u_projection * a_position;
        v_texCoord = a_texCoord;
    }  
`;
// 片元着色器
const fragmentShader = `
    // 设置浮点数精度
    precision mediump float;
    varying vec2 v_texCoord;
    // 声明一个uniform变量来保存纹理
    uniform sampler2D u_texture;
    void main () {
    	// 使用内建的texture2D函数进行采样，获取纹素颜色
        gl_FragColor = texture2D(u_texture, v_texCoord);
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

export {
    vertexShader,
    fragmentShader
};