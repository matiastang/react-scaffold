<!-- TOC -->

- [React脚手架工程](#react脚手架工程)
    - [目录结构](#目录结构)
        - [.history(.gitignore忽略)](#historygitignore忽略)
        - [dist](#dist)
        - [docs](#docs)
        - [node_modules(.gitignore忽略)](#node_modulesgitignore忽略)
        - [public](#public)
        - [src](#src)
        - [.babelrc.js](#babelrcjs)
        - [.eslintrc.js](#eslintrcjs)
        - [.gitignore](#gitignore)
        - [globals.d.ts](#globalsdts)
        - [LICENSE](#license)
        - [package.json](#packagejson)
        - [pnpm-lock.yaml](#pnpm-lockyaml)
        - [README.md](#readmemd)
        - [tsconfig.json](#tsconfigjson)
        - [webpack.config.js](#webpackconfigjs)
    - [注意](#注意)
        - [webpack 5](#webpack-5)
        - [eslint-loader](#eslint-loader)

<!-- /TOC -->
# React脚手架工程

## 目录结构

### .history(.gitignore忽略)

本地历史版本记录。

### dist

输入文件。
### docs

[VuePress](https://vuepress.vuejs.org/zh/guide/)相关目录。

### node_modules(.gitignore忽略)

`npm` | `yarn` | `pnpm`等包文件。

### public

模板文件。

### src

代码文件，入口文件为`index.tex`。

### .babelrc.js

`babel`配置文件。

### .eslintrc.js

`eslint`配置文件。

### .gitignore

`git`忽略文件。

### globals.d.ts

`ts`全局类型声明文件。
### LICENSE

许可证说明。

### package.json

`npm` | `yarn` | `pnpm`等包依赖管理。

### pnpm-lock.yaml

`pnpm`锁定文件。

*注意*：
* 如果使用`npm`则有`package-locak.json`文件。
* 如果使用`yarn`则有`yarn.locak`文件。

### README.md

自述文件。

### tsconfig.json

`ts`配置文件

### webpack.config.js

`webpack`配置文件。

## 注意

### webpack 5

使用高版本的`webpack-cli`会报错，降低版本
```c
"webpack-cli": "3.3.12"
```

### eslint-loader
使用[eslint-webpack-plugin](https://webpack.js.org/plugins/eslint-webpack-plugin/)替代`eslint-loader`。
```c
eslint-loader@4.0.2: This loader has been deprecated. Please use eslint-webpack-plugin
```