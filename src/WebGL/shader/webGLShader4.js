/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 13:43:26
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-10 13:50:06
 * @Description: WebGL4 着色语言
 */
// 顶点着色器
const vertexShader = `
    attribute vec4 a_position;
    // 新增一个a_color的 attribute 变量
    attribute vec4 a_color;
    // 新增一个v_color的 varying 变量
    varying vec4 v_color;
    void main () {
        // gl_Position为内置变量，表示当前点的位置
        gl_Position = a_position;
        v_color = a_color;
        // gl_Position为内置变量，表示当前点的大小，为浮点类型，如果赋值是整数类型会报错
        // gl_PointSize = 10.0;
    }  
`;
// 片元着色器
const fragmentShader = `
    // 设置浮点数精度
    precision mediump float;
    varying vec4 v_color;
    void main () {
        // vec4是表示四维向量，这里用来表示RGBA的值[0~1]，均为浮点数，如为整数则会报错
        // gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
        gl_FragColor = v_color;
    }
`;

export {
    vertexShader,
    fragmentShader
};