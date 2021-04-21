/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 10:23:20
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 16:48:15
 * @Description: WebGL3 着色语言
 */
// 顶点着色器
const vertexShader = `
    attribute vec4 a_position;
    uniform mat4 u_projection;
    void main () {
        // gl_Position为内置变量，表示当前点的位置
        gl_Position = u_projection * a_position;
        // gl_Position为内置变量，表示当前点的大小，为浮点类型，如果赋值是整数类型会报错
        gl_PointSize = 10.0;
    }  
`;
// 片元着色器
const fragmentShader = `
    // 设置浮点数精度
    precision mediump float;
    void main () {
        // vec4是表示四维向量，这里用来表示RGBA的值[0~1]，均为浮点数，如为整数则会报错
        gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
    }
`;

export {
    vertexShader,
    fragmentShader
};