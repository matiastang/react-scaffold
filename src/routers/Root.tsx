/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 17:09:58
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-22 14:56:31
 * @Description: 项目路由
 */
import React, { FC } from 'react';
import { Route } from 'react-router';
import { HashRouter, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { TestCss } from '../test';
import { GLPointColors } from '../WebGL';

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
                        <Route exact path="/test/css" component={ TestCss }/>
                        <Route component={() => <div>test css 404</div> } />
                    </Switch>
                )} />
                <Route component={() => <div>ROOT 404</div> } />
            </Switch>
        </HashRouter>
    );
};

export default hot(Root);