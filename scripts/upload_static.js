let fs = require("fs");
let needle = require("needle");
let utils = require("./utils");

let host = "xxx";
let username = "xxx";
let password = "xxx";
let service = "xxx";
let mod = "xxx";
let scmToken = "xxx";
let tarFileName = "ksc-console-xxx.tar.gz";
let exec = utils.exec;
let version = utils.generateOnlineVersion();

/**
 * webpack构建生产环境包
 */
function tarFile() {
  //压缩dist文件
  let cmd =
    "cd ../dist && rm -rf " +
    tarFileName +
    " && tar -zcf " +
    tarFileName +
    " ./*";
  return exec(cmd);
}

/**
 * 登录获取token
 */
function login() {
  let url = host + "/login";
  let postData = {
    username: username,
    password: password,
  };
  let options = {
    headers: { "Content-Type": "application/json" },
  };

  return needle("post", url, postData, options)
    .then(function (res) {
      console.log("Login success");
      return res.body.data.token;
    })
    .catch(function (err) {
      console.log("Login error: ", err);
    });
}

/**
 * 上传静态文件到ks3 bucket和scm lib
 * @param {*} token
 */
function upload(token) {
  let url = host + "/upload";
  let buffer = fs.readFileSync(process.cwd() + "/dist/" + tarFileName);

  let postData = {
    service: service,
    module: mod,
    version: version,
    // dest: "ks3",
    scmToken: scmToken,
    file: {
      buffer: buffer,
      filename: tarFileName,
      content_type: "application/gzip",
    },
  };
  let options = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Token": token,
    },
    multipart: true,
  };

  console.log("Start to upload file....");
  return needle("post", url, postData, options)
    .then(function (res) {
      if (res.body.data) {
        console.log(res.body.data.message);
      } else {
        console.log(res.body.message);
      }
    })
    .catch(function (err) {
      console.log("Upload file error: ", err);
    });
}

/**
 * 入口方法
 */
function main() {
  tarFile()
    .then(function () {
      console.log("Tar file finished, file name is " + "./dist/" + tarFileName);
      login().then(function (token) {
        upload(token);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

main();
