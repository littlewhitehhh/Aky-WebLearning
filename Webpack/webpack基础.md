## webpack 基础

webpack 静态打包工具，通过入口文件和依赖关系图，将项目中依赖的各个模块，打包成一个或者多个 bundle

### entry（入口文件）

- 单入口文件

```js
module.exports = {
  entry: "index.js",
};
```

- 多入口文件

```js
module.exports = {
  entry: {
    index: path.join(srcPath, "index.js"),
    other: path.join(srcPath, "other.js"),
  },
};
```
