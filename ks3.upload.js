var KS3 = require('ks3');

var AK = '5rxdsDagJs9lxMupSV8v';
var SK = '049v6f/gisgqmIai7YJlLhk7TPryTCArq09n0h08';
var bucketName = 'fe-frame';
var filePath = __dirname + '/dist';
var key = 'project/uss-console-message';
var region = 'BEIJING';
var ks3 = new KS3(AK, SK, bucketName, region);

console.log(filePath);
console.log(key);

ks3.upload.start({
    Bucket: bucketName,
    filePath: filePath,
    region: region,
    Key: key,
    ACL: 'public-read',
    fileSetting: {
        isDeep: true,
        ignore: /(.(swp|ds_store)$)/ig
    }
}, function (err, data, res) {
    console.log(data);
    console.log('end time:' + new Date());
    console.log('upload finished');
});