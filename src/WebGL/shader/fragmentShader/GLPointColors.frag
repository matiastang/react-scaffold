// 设置浮点数精度
precision mediump float;
void main () {
    // 计算方形区域每个片元距离方形几何中心的距离
    // gl.POINTS模式点渲染的方形区域,方形中心是0.5,0.5,左上角是坐标原点,右下角是1.0,1.0，
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    //根据距离设置片元
    if(r < 0.5){
      // 方形区域片元距离几何中心半径小于0.5，像素颜色设置红色
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }else {
      // 方形区域距离几何中心半径不小于0.5的片元剪裁舍弃掉：
      discard;
    }
}