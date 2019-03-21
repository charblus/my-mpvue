# my-mpvue

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### server
使用koa开发  
```
cd server
npm run dev
```
> server目录下config中需要填写小程序配置信息Appid & App Secret 等（注： 项目放github上App Secret明文显示 会收到腾讯云短信提醒该泄露，安全隐患）

### mpvue  [官方文档常见问题](http://mpvue.com/mpvue/#_18)
1.新增页面需要npm run dev重启一下。

2.小程序里所有的 BOM／DOM 都不能用，也就是说 v-html 指令不能用。

3.暂不支持在组件上使用 Class 与 Style 绑定，需要在组件内部书写。

4.mpvue 可以支持小程序的原生组件，比如： picker,map 等，需要注意的是原生组件上的事件绑定，需要以 vue 的事件绑定语法来绑定，如 `bindchange="eventName" `事件，需要写成 `@change="eventName"`。

5.mpvue 建议使用` v-model.lazy `绑定方式以优化性能，此外 v-model 在老基础库下输入框输入时可能存在光标重设的问题。 

6.写页面跳转时候传入动态参数，需要写成:url，如：`<navigator url=" '../test/main?id='+ id hover-class="none""`。

7.通过 `this.$root.$mp.query `进行获取小程序在 page onLoad 时候传递的 options。通过 `this.$root.$mp.appOptions` 进行获取小程序在 app onLaunch/onShow 时候传递的 options。

8. 页面跳转和传参(这里mpvue不支持vue-router)  使用微信的页面跳转方法，然后跳转页面使用`this.$root.$mp.query`获取参数。    注：使用`this.$root.$mp.query`获取参数需要在monted中获取，在created中会报Cannot read property 'query' of undefined 。


### mysql语句

Mysql 基本语法

`create  database 数据库名;`    创建数据库
`show tables; `                查看数据库所有表
`desc   表名；`           查看数据表
`alter table books add column count int default 0;`    在books表中添加count  int类型 默认0；
`select title, count from books; `   查看books表部分数据
`show create table books;`     查看创建books用了哪些语句
