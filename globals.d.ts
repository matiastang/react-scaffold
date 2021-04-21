/*
 * @Author: tangdaoyong
 * @Date: 2020-12-17 15:55:18
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-20 16:33:15
 * @Description: ts配置文件
 */
declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

// declare module '*.scss' {
//     const classes: { readonly [key: string]: string };
//     export default classes;
// }

// 全局声明svg component定义
declare interface SvgrComponent extends React.FunctionComponent<React.SVGAttributes<SVGAElement>> {}

declare module '*.svg' {
    const content: SvgrComponent;
    // const content: ReactComponent;
    export default content;
}

// 全局声明
// declare module '*.svg' {
//     const classes: { readonly [key: string]: string };
//     export default classes;
// }

// vert|tesc|tese|geom|frag|comp
// declare module '*.vert' {
//     const classes: { readonly [key: string]: string };
//     export default classes;
// }

// declare module '*.frag' {
//     const classes: { readonly [key: string]: string };
//     export default classes;
// }

// interface PostMessage {
//     postMessage(parameters: Object): Promise
// }
// interface IOSWebkit extends Window {
//     webkit: {
//         messageHandlers: {
//             jsConsole: {
//                 postMessage: PostMessage
//             }
//         }
//     }
//     // window.webkit.messageHandlers.jsConsole.postMessage(parameters);
// }
declare var window: Window & { webkit: any };