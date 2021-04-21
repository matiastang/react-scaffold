// 设置浮点数精度
precision mediump float;
varying vec2 v_texCoord;
// 声明一个uniform变量来保存纹理
uniform sampler2D u_texture;
void main () {
    // 使用内建的texture2D函数进行采样，获取纹素颜色
    vec4 v = texture2D(u_texture, v_texCoord);
    float red = v.r;
    float green = v.g;
    float blue = v.b;
    // bit-wise operator supported in GLSL ES 3.00 and above only
    // 位操作符仅在GLSL es3.00及以上版本中支持
    // float gray = (red * 76 + green * 151 + blue * 28)>>8;
    // float gray = red * 0.3 + green * 0.59 + blue * 0.11;
    // 4.平均值法：Gray=（R+G+B）/ 3;(/两边要为float)
    // '/' : wrong operand types - no operation '/' exists that takes a left-hand operand of type 'mediump float' and a right operand of type 'const int' (or there is no acceptable conversion)
    // float gray = (red + green + blue) / 3.0;
    // 5.仅取绿色：Gray=G
    float gray = green;
    gl_FragColor = vec4(gray, gray, gray, v.a);
}