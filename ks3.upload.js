var KS3 = require("ks3");

var AK = "xxxx";
var SK = "xxxxxxx-xxx";
var bucketName = "fe-frame";
var filePath = __dirname + "/dist";
var key = "project/project-name";
var region = "BEIJING";
var ks3 = new KS3(AK, SK, bucketName, region);

//上传静态文件（css, js)到ks3

ks3.upload.start(
  {
    Bucket: bucketName,
    filePath: filePath,
    region: region,
    Key: key,
    ACL: "public-read",
    fileSetting: {
      isDeep: true,
      ignore: /(.(swp|ds_store)$)/gi
    }
  },
  function(err, data, res) {
    console.log(data);
    console.log("end time:" + new Date());
    console.log("upload finished");
  }
);
