// /*
//  * @Author: tangdaoyong
//  * @Date: 2020-12-11 17:21:59
//  * @LastEditors: tangdaoyong
//  * @LastEditTime: 2020-12-11 17:27:57
//  * @Description: file content
//  */
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
    /*
    bit-wise operator supported in GLSL ES 3.00 and above only
    位操作符仅在GLSL es3.00及以上版本中支持
    */
    // float gray = (red * 76 + green * 151 + blue * 28)>>8;
    
    // float gray = red * 0.3 + green * 0.59 + blue * 0.11;
    /*
    4.平均值法：Gray=（R+G+B）/ 3;(/两边要为float)
    '/' : wrong operand types - no operation '/' exists that takes a left-hand operand of type 'mediump float' and a right operand of type 'const int' (or there is no acceptable conversion)
    */
    // float gray = (red + green + blue) / 3.0;
    /*
    5.仅取绿色：Gray=G；
    */
    float gray = green;
    
    gl_FragColor = vec4(gray, gray, gray, v.a);
    // gl_FragColor = vec4(red > 0.5 ? 1.0 : 0.0, green > 0.5 ? 1.0 : 0.0, blue > 0.5 ? 1.0 : 0.0, v.a);
}
// 我们可以通过下面几种方法，将其转换为灰度：
// 1.浮点算法：Gray=R*0.3+G*0.59+B*0.11
// 2.整数方法：Gray=(R*30+G*59+B*11)/100
// 3.移位方法：Gray =(R*76+G*151+B*28)>>8;
// 4.平均值法：Gray=（R+G+B）/3;
// 5.仅取绿色：Gray=G；
// 通过上述任一种方法求得Gray后，将原来的RGB(R,G,B)中的R,G,B统一用Gray替换，形成新的颜色RGB(Gray,Gray,Gray)，用它替换原来的RGB(R,G,B)就是灰度图了。