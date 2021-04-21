// 设置浮点数精度
precision mediump float;
varying vec2 v_texCoord;
// 声明一个uniform变量来保存纹理
uniform sampler2D u_texture_0;
uniform sampler2D u_texture_1;
void main () {
    // 使用内建的texture2D函数进行采样，获取纹素颜色
    vec4 color_0 = texture2D(u_texture_0, v_texCoord);
    vec4 color_1 = texture2D(u_texture_1, v_texCoord);
    if (color_0.a > 0.0) {
        gl_FragColor = color_1;
    } else {
        gl_FragColor = color_0;
    }
}