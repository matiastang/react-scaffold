/*
 * @Author: tangdaoyong
 * @Date: 2020-12-15 10:05:20
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-15 13:32:52
 * @Description: shader常量
 */
/*
* WebGL按列的模式来读，所以定义矩阵时要使用转置矩阵(把矩阵的行和列位置进行互换的矩阵，称为矩阵的转置)
*/
// interface WebGLNumber {
//     value: number
// }
/**
 * @description: 单位矩阵
 * @return {Float32Array}
 */
function unitMatrix() {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: 旋转矩阵
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Float32Array}
 */
function rotatMatrix(x: number, y: number, z: number) {
    // Math.multiMatrix44
    // return multiMatrix44(multiMatrix44(rotatXMatrix(x), rotatYMatrix(y)), rotatZMatrix(z));
}

/**
 * @description: X轴旋转矩阵
 * @param {number} value
 * @return {Float32Array}
 */
function rotatXMatrix(value: number) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, Math.cos(value), -Math.sin(value), 0.0,
        0.0, Math.sin(value), Math.cos(value), 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: Y轴旋转矩阵
 * @param {number} value
 * @return {Float32Array}
 */
function rotatYMatrix(value: number) {
    return new Float32Array([
        Math.cos(value), 0.0, -Math.sin(value), 0.0,
        0.0, 1.0, 0.0, 0.0,
        Math.sin(value), 0.0, Math.cos(value), 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: Z轴旋转矩阵
 * @param {number} value
 * @return {Float32Array}
 */
function rotatZMatrix(value: number) {
    return new Float32Array([
        Math.cos(value), Math.sin(value), 0.0, 0.0,
        -Math.sin(value), Math.cos(value), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: 缩放矩阵
 * @param {number} zoomX
 * @param {number} zoomY
 * @param {number} zoomZ
 * @return {Float32Array}
 */
function zoomMatrix(zoomX: number, zoomY: number, zoomZ: number) {
    return new Float32Array([
        zoomX, 0.0, 0.0, 0.0,
        0.0, zoomY, 0.0, 0.0,
        0.0, 0.0, zoomZ, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: 平移矩阵
 * @param {number} translationX
 * @param {number} translationY
 * @param {number} translationZ
 * @return {Float32Array}
 */
function translationMatrix(translationX: number, translationY: number, translationZ: number) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        translationX, translationY, translationZ, 1.0
    ]);
}

/**
 * @description: 坐标转换矩阵
 * @param {number} l
 * @param {number} r
 * @param {number} t
 * @param {number} b
 * @param {number} n
 * @param {number} f
 * @return {Float32Array}
 */
function createProjectionMatrix(l: number, r: number, t: number, b: number, n: number, f: number): Float32Array {
    return new Float32Array([
        2.0 / (r - l), 0.0, 0.0, 0.0,
        0.0, 2.0 / (t - b), 0.0, 0.0,
        0.0, 0.0, 2.0 / (f - n), 0.0,
        -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1.0
    ]);
}

export {
    unitMatrix,
    rotatMatrix,
    rotatXMatrix,
    rotatYMatrix,
    rotatZMatrix,
    zoomMatrix,
    translationMatrix,
    createProjectionMatrix
};