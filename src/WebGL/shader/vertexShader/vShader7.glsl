// /*
//  * @Author: tangdaoyong
//  * @Date: 2020-12-11 17:21:17
//  * @LastEditors: tangdaoyong
//  * @LastEditTime: 2020-12-11 17:58:15
//  * @Description: file content
//  */
attribute vec4 a_position;
// 纹理坐标信息
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
uniform mat4 u_projection;
void main () {
    // gl_Position为内置变量，表示当前点的位置
    gl_Position = u_projection * a_position;
    v_texCoord = a_texCoord;
}