/*
 * @Author: tangdaoyong
 * @Date: 2020-12-15 10:39:54
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-25 18:10:51
 * @Description: 着色语言工具
 */

/**
 * @description: 获取WebGL context(兼容几种浏览器的获取方式)
 * @param {HTMLCanvasElement} canvas
 * @param {any} options
 * @return {WebGLRenderingContext | null}
 */
function getWebGLContext(canvas: HTMLCanvasElement, options?: any): WebGLRenderingContext | null {
    let names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    let context:null  = null;
    // 不使用forEach无法退出
    for (var i = 0; i < names.length; ++i ) {
        try {
            let canvasContext = canvas.getContext(names[i], options);
            if (canvasContext !== null && canvasContext instanceof WebGLRenderingContext) {
                return <WebGLRenderingContext>canvasContext;
            }
        } catch (e) {
            console.log(e);
            continue;
        }
    }
    return context;
}

/**
 * @description: 获取WebGL2 context
 * @param {HTMLCanvasElement} canvas
 * @param {any} options
 * @return {WebGL2RenderingContext | null}
 */
function getWebGL2Context(canvas: HTMLCanvasElement, options?: any): WebGL2RenderingContext | null {
    let names = ['webgl2'];
    let context = null;
    // 不使用forEach无法退出
    for (var i = 0; i < names.length; ++i ) {
        try {
            let canvasContext = canvas.getContext(names[i], options);
            if (canvasContext === null || Object.is(canvasContext, WebGL2RenderingContext)) {
                return <WebGL2RenderingContext | null>canvasContext;
            }
        } catch (e) {
            continue;
        }
    }
    return context;
}

/**
 * @description: 获取 WebGLProgram
 * @param {WebGLRenderingContext} gl
 * @param {string} vertexSource
 * @param {string} fragmentSource
 * @return {WebGLProgram | string}
 */
function getWebGLProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram | string {
    // 根据源代码创建顶点着色器
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    if (typeof vertexShader === 'string') {
        return vertexShader;
    }
    // 根据源代码创建片元着色器
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (typeof fragmentShader === 'string') {
        return fragmentShader;
    }
    // 创建 WebGLProgram 程序
    let program = createProgram(gl, vertexShader, fragmentShader);
    return program;
}

/**
 * @description: 创建 program 对象
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 * @return {WebGLProgram | string}
 */
function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | string {
    // 创建 program 对象
    let program = gl.createProgram();
    if (program === null) {
        return '创建 program 对象失败！';
    }
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
    // 如果 program 链接失败，则返回错误信息
    let err = gl.getProgramInfoLog(program);
    if (err === null) {
        return '';
    }
    // 删除 program 对象
    gl.deleteProgram(program);
    return err;
}

/**
 * @description: 创建 shader 对象
 * @param {WebGLRenderingContext} gl
 * @param {number} type
 * @param {string} source
 * @return {WebGLShader | string}
 */
function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | string {
    // 创建 shader 对象
    let shader = gl.createShader(type);
    if (shader === null) {
        return '创建 shader 对象失败！';
    }
    // 往 shader 中传入源代码
    gl.shaderSource(shader, source);
    // 编译 shader
    gl.compileShader(shader);
    // 判断 shader 是否编译成功
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    // 如果编译失败，则返回错误信息
    let err = gl.getShaderInfoLog(shader);
    // 删除 shader 对象
    gl.deleteShader(shader);
    if (err === null) {
        return '';
    }
    return err;
}

/**
 * @description: 通过shader文件创建program
 * @param {WebGLRenderingContext} gl
 * @param {string} vsFileName
 * @param {string} fsFileName
 * @return {Promise<WebGLProgram>}
 */
function getWebGLProgramFromShadersFile(gl: WebGLRenderingContext, vsFileName: string, fsFileName: string): Promise<WebGLProgram> {
    return new Promise((resolve, reject) => {
        loadShaders(gl, vsFileName, fsFileName).then((files) => {
            let vsContent = files[0];
            let fsContent = files[1];
            let program = getWebGLProgram(gl, vsContent, fsContent);
            gl.useProgram(program);
            resolve(program);
        }).catch((err) => {
            reject(err);
        }).finally(() => {
            console.log(`vsFile:${vsFileName}，fsFile:${fsFileName}加载完成`);
        });
    });
}

/**
 * @description: 加载 shaders 文件
 * @param {WebGLRenderingContext} gl
 * @param {string} vsFileName
 * @param {string} fsFileName
 * @return {Promise<[string, string]>}
 */
function loadShaders(gl: WebGLRenderingContext, vsFileName: string, fsFileName: string): Promise<[string, string]> {
    let loadVShaderPromise = loadShaderFromFile(vsFileName);
    let loadFShaderPromise = loadShaderFromFile(fsFileName);
    return Promise.all([loadVShaderPromise, loadFShaderPromise]);
}

/**
 * @description: 加载Shader文件
 * @param {string} filename
 * @return {Promise<string>}
 */
function loadShaderFromFile(filename: string): Promise<string> {
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

export default getWebGLContext;

export {
    getWebGLContext,
    getWebGL2Context,
    getWebGLProgram,
    createProgram,
    createShader,
    getWebGLProgramFromShadersFile,
    loadShaders,
    loadShaderFromFile,
    loadImages,
    loadImage
};

/**
 * @description: 加载多张图片
 * @param {string} imageURLs
 * @return {Promise<HTMLImageElement[]>}
 */
function loadImages(imageURLs: string[]): Promise<HTMLImageElement[]> {
    let all: Array<Promise<HTMLImageElement>> = [];
    imageURLs.forEach(element => {
        all.push(loadImage(element));
    });
    return Promise.all(all);
}
 
/**
 * @description: 加载图片
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
function loadImage(src: string): Promise<HTMLImageElement> {
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