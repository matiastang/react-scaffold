/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 17:09:58
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-10 10:56:41
 * @Description: 项目路由
 */
import React, { FC, Suspense } from 'react';
import { Route } from 'react-router';
import { HashRouter, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import loadable from '@loadable/component';

// import { TestCss } from '../test';
// import { GLPointColors } from '../WebGL';

// @loadable/component栏加载

const GLPointColors = loadable(() => import(/* webpackChunkName: "webgl" */ '../WebGL/components/glsl/GLPointColor'));

// React.lazy懒加载
/*
Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'esnext', 'commonjs', 'amd', 'system', or 'umd'.
修改tsconfig.json文件中的"module": "es6"=>"module": "es2020"
*/
/*
使用了动态导入后，TestCss.tsx将生成另外一个文件，不再打入到主包里。
*/
// const TestCss = React.lazy(() => import('../test/TestCss'));
/*
Webpack的默认行为是将它们命名为x.js，其中x是一个增量数字，这取决于你在代码中导入多少动态块。
这将使我们无法清楚地看到哪个文件正在加载什么代码。
为了解决这个问题，webpack引入了魔术注释，一个chunk可以像下面这样命名(例如:math.js)。
*/
// webpack重命名
const TestCss = React.lazy(() => import(/* webpackChunkName: "math" */ /* webpackPrefetch: true */ '../test/TestCss'));

const Root: FC = () => {
  
    return (
        <HashRouter>
            <Switch>
                <Route path="/webgl" component={() => (
                    <Switch>
                        <Route exact path="/webgl/glpointcolors" component={ GLPointColors }/>
                        <Route component={() => <div>webgl 404</div> } />
                    </Switch>
                )} />
                <Route path="/test" component={() => (
                    <Switch>
                        <Route exact path="/test/css" component={() => {
                            return (
                                <Suspense fallback={<div>Loading...</div>}>
                                    {/* 可以包含多个动态导入的组件 */}
                                    <TestCss />
                                </Suspense>
                            );
                        }}/>
                        {/* <Route exact path="/test/css" component={ TestCss }/> */}
                        <Route component={() => <div>test css 404</div> } />
                    </Switch>
                )} />
                <Route component={() => <div>ROOT 404</div> } />
            </Switch>
        </HashRouter>
    );
};

export default hot(Root);