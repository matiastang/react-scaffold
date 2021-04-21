/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 09:55:00
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-14 16:16:07
 * @Description: WebGL 主页
 */
import React, { useCallback } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import WEBGL1 from './components/WebGL1';
import WEBGL2 from './components/WebGL2';
import WEBGL3 from './components/WebGL3';
import WEBGL4 from './components/WebGL4';
import WEBGL5 from './components/WebGL5';
import WEBGL6 from './components/WebGL6';
import WEBGL7 from './components/WebGL7';
import WEBGL8 from './components/WebGL8';
import WEBGL9 from './components/WebGL9';

function Home() {

    const closeWindow = useCallback(() => {
        /*
        window.open('','_self','');window.close();与window.close();的区别就是
        window.open('','_self','');window.close();直接关闭；
        window.close();要弹框确认后才关闭
        */
        /*
        window.opener返回打开当前窗口的那个窗口的引用[MDN Window/opener](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/opener)
        */
        window.opener = null;
        window.open('', '_self');
        window.close();
        /*
        A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed "javascript:window.opener=null;window.open('','_self');window.close();".
        */
        /*
        WebGL.jsx:19 Scripts may close only the windows that were opened by them.
        */
    });

    return (
        <>
            <WEBGL9/>
            {/* <WEBGL8 />
            <WEBGL7 />
            <WEBGL6 />
            <WEBGL5 />
            <WEBGL4 />
            <WEBGL3 />
            <WEBGL2 />
            <WEBGL1 /> */}
            {/* <button onClick={ closeWindow }>关闭当前窗口</button> */}
            {/* <a href="javascript:window.opener=null;window.open('','_self');window.close();">关闭</a> */}
        </>
    );
}

export default hot(Home);