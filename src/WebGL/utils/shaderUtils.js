/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 09:43:34
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-14 16:47:18
 * @Description: 着色语言工具
 */

/**
 * @description: 加载多图
 * @param {*} imageURLs
 * @return {*}
 */ 
function loadImages(imageURLs) {
    // TODO: -- 输入判断
    let all = [];
    imageURLs.forEach(element => {
        all.push(loadImage(element));
    });
    return Promise.all(all);
}

/**
 * @description: 加载图片
 * @param {*} src
 * @return {*}
 */ 
function loadImage(src) {
    // TODO: -- 输入判断
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = function() {
            resolve(image);
        };
        image.onerror = function() {
            reject(image);
        };
        image.onabort = function() {
            reject(image);
        };
        image.src = src;
    });
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} type 
 * @param {string} source 
 */
function createShader(gl, type, source) {
    // 创建 shader 对象
    let shader = gl.createShader(type);
    // 往 shader 中传入源代码
    gl.shaderSource(shader, source);
    // 编译 shader
    gl.compileShader(shader);
    // 判断 shader 是否编译成功
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    // 如果编译失败，则打印错误信息
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader 
 */
function createProgram(gl, vertexShader, fragmentShader) {
    // 创建 program 对象
    let program = gl.createProgram();
    // 往 program 对象中传入 WebGLShader 对象
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // 链接 program
    gl.linkProgram(program);
    // 判断 program 是否链接成功
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    // 如果 program 链接失败，则打印错误信息
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexSource 
 * @param {string} fragmentSource 
 */
function initWebGL(gl, vertexSource, fragmentSource) {
    // 根据源代码创建顶点着色器
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    // 根据源代码创建片元着色器
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    // 创建 WebGLProgram 程序
    let program = createProgram(gl, vertexShader, fragmentShader);
    return program;
}

export default initWebGL;

/**
 * @description: 获取gl context(兼容几种浏览器的获取方式)
 * @param {*} canvas
 * @param {*} opt_attribs
 * @return {*}
 */
function getWebGLContext(canvas, opt_attribs) {
    let names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    let context = null;
    // 不使用forEach无法退出
    for (var i = 0; i < names.length; ++i ) {
        try {
            context = canvas.getContext(names[i], opt_attribs);
        } catch (e) {
            continue;
        }
        if (context) {
            break;
        }
    }
    return context;
}

/**
 * @description: 坐标转换矩阵
 * @param {*} l
 * @param {*} r
 * @param {*} t
 * @param {*} b
 * @param {*} n
 * @param {*} f
 * @return {*}
 */
function createProjectionMat(l, r, t, b, n, f) {
    return new Float32Array([
        2.0 / (r - l), 0.0, 0.0, 0.0,
        0.0, 2.0 / (t - b), 0.0, 0.0,
        0.0, 0.0, 2.0 / (f - n), 0.0,
        -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1.0
    ]);
}

/**
 * @description: 旋转矩阵
 * @param {Float} value
 * @return {*}
 */
function rotatMatrix(value) {
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

/**
 * @description: 加载shader文件并创建program
 * @param {WebGLRenderingContext} gl
 * @param {String} vsFile
 * @param {String} fsFile
 * @return {Promise}
 */
function initShader(gl, vsFile, fsFile) {
    return new Promise((resolve, reject) => {
        let loadVShaderPromise = loadShaderFromFile(vsFile);
        let loadFShaderPromise = loadShaderFromFile(fsFile);
        Promise.all([loadVShaderPromise, loadFShaderPromise]).then((files) => {
            let vsContent = files[0];
            let fsContent = files[1];
            let sp = initWebGL(gl, vsContent, fsContent);
            gl.useProgram(sp);
            resolve(sp);
        }).catch((err) => {
            console.log(err);
            reject(err);
        }).finally(() => {
            console.log('加载文件完成');
        });
    });
}

/**
 * @description: 加载Shader文件
 * @param {String} filename
 * @return {Promise}
 */
function loadShaderFromFile(filename) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.status);
                }
            }
        };
        request.open('GET', filename, true);
        request.send();
    });
}

export {
    loadImages,
    loadImage,
    initShader,
    getWebGLContext,
    createProjectionMat,
    rotatMatrix,
    zoomMatrix,
    translationMatrix
};

// // 初始化着色器，传入GL contest、顶点着色器代码、片元着色器代码
// function initShaders(gl, vshader, fshader) {
//     // 创建着色程序，实际上返回的int值，相当于底层的一个句柄引用
//     var program = createProgram(gl, vshader, fshader);
//     if (!program) {
//         console.log('Failed to create program');
//         return false;
//     }
//     // 指定这个gl context使用这个着色程序
//     gl.useProgram(program);
//     gl.program = program;
//     return true;
// }
  
// // 创建着色程序
// function createProgram(gl, vshader, fshader) {
//     // 分别编译加载顶点着色器和片元着色器代码，实际上返回的也是int类型
//     var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
//     var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
//     if (!vertexShader || !fragmentShader) {
//         return null;
//     }
//     // 首先创建一个程序，获取这个程序的句柄引用
//     var program = gl.createProgram();
//     if (!program) {
//         return null;
//     }
//     // 然后把这个程序绑定着色器
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     // 链接程序，是不是和c语言的编译很像？
//     gl.linkProgram(program);
  
//     // 获取program的链接情况，如果链接失败则进行清理
//     var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
//     if (!linked) {
//         var error = gl.getProgramInfoLog(program);
//         console.log('Failed to link program: ' + error);
//         gl.deleteProgram(program);
//         gl.deleteShader(fragmentShader);
//         gl.deleteShader(vertexShader);
//         return null;
//     }
//     return program;
// }
  
// // 加载编译着色器代码
// function loadShader(gl, type, source) {
//     // 创建一个新的着色器
//     var shader = gl.createShader(type);
//     if (shader === null) {
//         console.log('unable to create shader');
//         return null;
//     }
//     // /加载着色器的源代码
//     gl.shaderSource(shader, source);
//     // 编译着色器代码
//     gl.compileShader(shader);
//     // 获取着色器的编译情况，如果编译失败则进行处理
//     var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
//     if (!compiled) {
//         var error = gl.getShaderInfoLog(shader);
//         console.log('Failed to compile shader: ' + error);
//         gl.deleteShader(shader);
//         return null;
//     }
//     return shader;
// }

/*
// 获取<canvas>标签
var canvas = document.getElementById('webgl');
if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
}
// 获取web gl context
var gl = getWebGLContext(canvas);
if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
}

// 初始化着色器
if (!initShaders(gl, VERT_SHADER_SRC, FRAG_SHADER_SRC)) {
    console.log('Failed to intialize shaders.');
    return;
}

// 设置canvas的背景颜色
gl.clearColor(0.0, 1.0, 0.0, 1.0);
// 清空颜色缓冲区
gl.clear(gl.COLOR_BUFFER_BIT);

// 画上一个点
gl.drawArrays(gl.POINTS, 0, 1);
*/  