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

### mysql语句

Mysql 基本语法

`create  database 数据库名;`    创建数据库
`show tables; `                查看数据库所有表
`desc   表名；`           查看数据表
`alter table books add column count int default 0;`    在books表中添加count  int类型 默认0；
`select title, count from books; `   查看books表部分数据
`show create table books;`     查看创建books用了哪些语句
