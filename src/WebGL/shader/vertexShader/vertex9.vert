// 定点坐标
attribute vec4 a_position;
// 纹理坐标信息
attribute vec2 a_texCoord;
// 定点变化矩阵
uniform mat4 u_projection;
varying vec2 v_texCoord;
void main () {
    // gl_Position = u_projection * a_position;
    gl_Position = a_position;
    v_texCoord = a_texCoord;
}