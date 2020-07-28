var childProcess = require("child_process");

//上线版本号码，时间戳
function generateOnlineVersion() {
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
  return (
    "" +
    year +
    (month >= 10 ? month : "0" + month) +
    day +
    (hour < 10 ? "0" + hour : hour) +
    (minute < 10 ? "0" + minute : minute) +
    (second < 10 ? "0" + second : second)
  );
}

function exec(command) {
  return new Promise(function (resolve, reject) {
    let cmd = childProcess.exec(command, { maxBuffer: 50000 * 1024 }, function (
      err,
      stdout
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);
  });
}

function param(obj) {
  let ret = [];
  for (let attr in obj) {
    if (obj[attr] !== "" && obj[attr] !== undefined) {
      ret.push(attr + "=" + obj[attr]);
    }
  }
  return ret.join("&");
}

module.exports.generateOnlineVersion = generateOnlineVersion;
module.exports.exec = exec;
module.exports.param = param;
