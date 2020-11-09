# 记录

1. 使用 hash 是为了上线更新的时候避免有缓存

2. 构建可预测的持久化缓存方案

3. 默认读取的是根目录下的 webpack.config.js，如果将 webpack.config.js 文件放在了其他文件夹下，则需要在 package.json 里进行如下配置:

```js
   "build": "webpack --mode production --config scripts/webpack.config.js",

   // 通过这种方式，我们可以更改webpack.config.js这个文件名
```

4.

```js
   // 执行npm run dev不会创建dist文件，它是打包到内存里面
   "dev": "webpack-dev-server --mode development --config scripts/webpack.config.js",
```

5. borserslist 调用 caniuse 这个网站的 API，来浏览器属性在浏览器中的兼容性
