# fe-project-template

### 基本信息

> #### 项目说明:

```
本项目金山云前端控制台项目模板，配合 [kscfe-cli](https://github.com/ksc-fe/ksc-fe-cli) 脚手架使用。
```

> #### 项目技术栈:

- nodejs: >v10.x.x
- vue: v2.4
- vue-cli: 3.0
- kpc: v1.3
- stylus: v3.0

> #### 目录结构:
```
fe-project-template (vue/intact + kpc + axios)
|
├── public                     // index.html
├── dist                       // 构建输出目录
|── script                     // vue页面生成脚本
├── src                        // 源代码
│   ├── assets
|   │   ├── font
|   |   ├── images             // 图片，字体等静态资源
│   ├── components             // 公用组件
│   ├── filters                // filter
|   |—— api                    // API请求
│   ├── store                  // vuex store
│   ├── router                 // 路由
│   ├── styles                 // 样式
│   ├── utils                  // 工具
│   ├── views                  // 页面文件，根据模块创建子目录
│   ├── libs                   // 第三方库
│   |── main.js                // 入口文件
|   ├── App.vue                // 根组件
|── test                       // 测试相关（按需创建）
|── mock                       // mock数据（按需创建）
├── .babelrc                   // babel配置
|-- build.sh                   //部署脚本
|-- upload_static.js           //静态资源上传脚本
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── vue.config.js              // webpack, proxy配置文件
└── package.json               // package.json
├── README.md                  // 项目说明文件
└── RELEASE.md                 // 发布记录说明
```
