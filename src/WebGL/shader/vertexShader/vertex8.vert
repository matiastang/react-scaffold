/*
 * @Author: tangdaoyong
 * @Date: 2020-12-14 14:24:42
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-14 15:42:23
 * @Description: file content
 */
attribute vec4 a_position;
// 纹理坐标信息
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
uniform mat4 u_projection;
uniform mat4 rad_projection;
void main () {
    gl_Position = u_projection * rad_projection * a_position;
    v_texCoord = a_texCoord;
}