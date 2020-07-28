const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let utils = require("./scripts/utils");
let version = utils.generateOnlineVersion();

Object.defineProperty(Date.prototype, "YYYYMMDDHHMMSS", {
  value: function () {
    function timeDir(n) {
      return (n < 10 ? "0" : "") + n;
    }

    return (
      this.getFullYear() +
      timeDir(this.getMonth() + 1) +
      timeDir(this.getDate()) +
      timeDir(this.getHours()) +
      timeDir(this.getMinutes()) +
      timeDir(this.getSeconds())
    );
  },
});
var dateDir = new Date().YYYYMMDDHHMMSS();

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "//static.ksyun.com/project/ebs/console/" + version + '"/"'
      : "",

  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: "dist",

  // 静态资源存放的位置
  assetsDir: "v" + dateDir,

  //lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: true,

  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,

  // devServer:{type:Object} 3个属性host,port,https
  devServer: {
    port: 7070, // 端口号
    host: "ebs.console.dev.ksyun.com",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/i/ebs": {
        target: "http://ebs.api.sdns.ksyun.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // // 配置插件
  configureWebpack: {
    resolve: {
      alias: {
        kpc: "kpc/@stylus",
        intact$: "intact-vue",
      },
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            {
              loader: "stylus-loader",
              options: {
                "include css": true,
                "resolve url": true,
                import: "~kpc/styles/themes/ksyun/index.styl",
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ["console.log"], //移除console
            },
          },
        }),
        new HtmlWebpackPlugin({
          // 构建html文件
          filename: "./index.html",
          template: "./src/template/index.html",
          // inject: false,
          minify: {
            //压缩HTML文件
            removeComments: true, //移除html中的注释
            collapseWhitespace: false, //删除空白符与换行符
          },
        }),
      ],
    },
  },
  chainWebpack: () => {
    // config.resolve.alias.set('@b', path.resolve('./src'))
  },
  lintOnSave: false,
};
