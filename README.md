# 前端项目脚手架

前端项目模板，配合 [kscfe-cli](https://github.com/ksc-fe/ksc-fe-cli) 脚手架使用。

##项目结构

```
fe-project-template (vue/intact + kpc + axios)
|
├── public                     // index.html
├── dist                       // 构建输出目录
├── src                        // 源代码
│   ├── assets
├   │   ├── font
├	|	├── images			   // 图片，字体等静态资源
│   ├── components			   // 公用组件
│   ├── layout
│   ├── filters				   //filter
│   ├── mixin
|	|—— api					   // API请求
│   ├── store                  // vuex store
│   ├── router                 // 路由
│   ├── styles                 // 样式
│   ├── utils                  // 工具
│   ├── views                  // 页面文件，根据模块划分
│   ├── libs                   // 第三方库
│   |── main.js                // 入口文件
|	├── App.vue                // 根组件
|── test					   // 测试相关（按需创建）
|── mock             		   // mock数据（按需创建）
├── .babelrc                   // babel配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── vue.config.js  		   	   // webpack, proxy配置文件
└── package.json               // package.json
```
