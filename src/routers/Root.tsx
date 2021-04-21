/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 17:09:58
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-21 16:44:35
 * @Description: 项目路由
 */
import React, { FC, useEffect, useState } from 'react';
import { Route } from 'react-router';
import { HashRouter, Switch } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { hot } from 'react-hot-loader/root';

import { TestCss } from '../test';
import { GLPointColors } from '../WebGL';

// import Layout from '../layout/Layout';
// import SVGHome from '../svg/SVG';
// import Three from '../threejs/ThreeJS';
// import G2Home from '../G2/G2Home';
// // import Error from '../components/Error';
// import Hello from '../G2/components/hello';
// import Point from '../G2/components/geometry/point/Point';
// import Line from '../G2/components/geometry/path&line/Line';
// import Polygon from '../G2/components/geometry/polygon/Polygon';
// import GView from '../G2/components/view/View';
// import GLPointColor from '../WebGL/components/glsl/GLPointColor';
// import WEBGL from '../WebGL/WebGL';
// import IOS from '../ios/Ios';

// import G2Routers from '../G2/G2Home';

// UI
// import Input from '../UI/UITest';

// routes.push(G2Routers);

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
                {/* <Route path="/test" component={() => (
                    <Switch>
                        <Route exact path="/test/css" component={ TestCss }/>
                        <Route component={() => <div>test 404</div> } />
                    </Switch>
                )} /> */}
                <Route component={() => <div>ROOT 404</div> } />
            </Switch>
        </HashRouter>
        // <HashRouter>
        //     <Switch>
        //         <Route path="/svg" component={() => (
        //             <Switch>
        //                 <Route exact path="/svg/home" component={ SVGHome }/>
        //                 <Route component={() => <div>svg 404</div> } />
        //             </Switch>
        //         )} />
        //         <Route path="/three" component={() => (
        //             <Switch>
        //                 <Route exact path="/three/home" component={ Three }/>
        //                 <Route component={() => <div>three 404</div> } />
        //             </Switch>
        //         )} />
        //         <Route path="/g2" component={() => (
        //             <Switch>
        //                 {/* <Route exact path="/" component={ G2Home }/> */}
        //                 <Route exact path="/g2/hello" component={ Hello }/>
        //                 <Route exact path="/g2/point" component={ Point }/>
        //                 <Route exact path="/g2/line" component={ Line }/>
        //                 <Route exact path="/g2/polygon" component={ Polygon }/>
        //                 <Route exact path="/g2/view" component={ GView }/>
        //                 <Route component={() => <div>g2 404</div> } />
        //             </Switch>
        //         )} />
        //         <Route path="/webgl" component={() => (
        //             <Switch>
        //                 <Route exact path="/webgl/webgl" component={ WEBGL }/>
        //                 <Route exact path="/webgl/glpointcolor" component={ GLPointColor }/>
        //                 <Route component={() => <div>webgl 404</div> } />
        //             </Switch>
        //         )} />
        //         <Route path="/UI" component={() => (
        //             <Switch>
        //                 <Route exact path="/UI/Input" component={ Input }/>
        //                 <Route component={() => <div>UI 404</div> } />
        //             </Switch>
        //         )} />
        //         <Route component={() => <div>ROOT 404</div> } />
        //     </Switch>
        // </HashRouter>
        // <HashRouter>
        //     {
        //         renderRoutes(routes)
        //     }
        // </HashRouter>
        // <HashRouter>
        //     <Route path="/" exact  component={ IOS } />
        //     <Route path="/svg" exact  component={ SVGHome } />
        //     <Route path="/three" exact  component={ Three } />
        //     <Route path="/g2/hello" exact  component={ Hello } />
        //     <Route path="/g2/point" exact  component={ Point } />
        //     <Route path="/g2/line" exact  component={ Line } />
        //     <Route path="/g2/polygon" exact  component={ Polygon } />
        //     <Route path="/g2/view" exact  component={ GView } />
        //     <Route path="/webgl/glpointcolor" exact  component={ GLPointColor } />
        //     {/* <Route path="/g2" exact component={ Layout } >
        //         <G2Home />
        //     </Route> */}
        //     {/* <Route path="/webgl">
        //         <Route path="glpointcolor" component={ GLPointColor } />
        //     </Route> */}
        //     {/* <Route path="*" component={ Error } /> */}
        // </HashRouter>
    );
};

export default hot(Root);