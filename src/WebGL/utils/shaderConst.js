/*
 * @Author: tangdaoyong
 * @Date: 2020-12-14 15:52:33
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-14 16:11:13
 * @Description: shader常量
 */

/**
 * @description: 单位矩阵
 * @param {*}
 * @return {*}
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
 * @param {*} x
 * @param {*} y
 * @param {*} z
 * @return {*}
 */
function rotatMatrix(x, y, z) {
    // TODO：--输入判断
    return multiMatrix44(multiMatrix44(rotatXMatrix(x), rotatYMatrix(y)), rotatZMatrix(z));
}

/**
 * @description: X轴旋转矩阵
 * @param {Float} value
 * @return {*}
 */
function rotatXMatrix(value) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, Math.cos(value), -Math.sin(value), 0.0,
        0.0, Math.sin(value), Math.cos(value), 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: Y轴旋转矩阵
 * @param {Float} value
 * @return {*}
 */
function rotatYMatrix(value) {
    return new Float32Array([
        Math.cos(value), 0.0, -Math.sin(value), 0.0,
        0.0, 1.0, 0.0, 0.0,
        Math.sin(value), 0.0, Math.cos(value), 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: Z轴旋转矩阵
 * @param {Float} value
 * @return {*}
 */
function rotatZMatrix(value) {
    // webgl按列的模式来读，所以定义矩阵时要使用转置矩阵(把矩阵的行和列位置进行互换的矩阵，称为矩阵的转置)
    return new Float32Array([
        Math.cos(value), Math.sin(value), 0.0, 0.0,
        -Math.sin(value), Math.cos(value), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: 缩放矩阵
 * @param {*} zoomX
 * @param {*} zoomY
 * @param {*} zoomZ
 * @return {*}
 */
function zoomMatrix(zoomX, zoomY, zoomZ) {
    // webgl按列的模式来读，所以定义矩阵时要使用转置矩阵(把矩阵的行和列位置进行互换的矩阵，称为矩阵的转置)
    return new Float32Array([
        zoomX, 0.0, 0.0, 0.0,
        0.0, zoomY, 0.0, 0.0,
        0.0, 0.0, zoomZ, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * @description: 平移矩阵
 * @param {*} translationX
 * @param {*} translationY
 * @param {*} translationZ
 * @return {*}
 */
function translationMatrix(translationX, translationY, translationZ) {
    // webgl按列的模式来读，所以定义矩阵时要使用转置矩阵(把矩阵的行和列位置进行互换的矩阵，称为矩阵的转置)
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        translationX, translationY, translationZ, 1.0
    ]);
}

export {
    unitMatrix,
    rotatMatrix,
    rotatXMatrix,
    rotatYMatrix,
    rotatZMatrix,
    zoomMatrix,
    translationMatrix
};