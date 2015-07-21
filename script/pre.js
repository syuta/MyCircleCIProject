var request = require('request');
var AWS = require('aws-sdk');

var vaultUrl = 'http://52.69.127.40:8200/v1/secret/aws';
var vaultToken = 'f7822509-fa70-5986-deff-82c138f9b070';
var bucket = 'circleci-test-bucket';

if(process.argv.length < 4) {
  console.log("missing argument. S3path and OutputPath.");
  return;
}

var s3Path = process.argv[2];
var outputPath = process.argv[3];

var options = {
  url: vaultUrl,
  headers: {
    'X-Vault-Token': vaultToken
  }
};

function download(accessKey,secretKey) {
  AWS.config.update({accessKeyId: accessKey, secretAccessKey: secretKey});
  var s3 = new AWS.S3();
  var params = { Bucket:bucket,Key: s3Path };

  var file = require('fs').createWriteStream(outputPath);
  s3.getObject(params).createReadStream().pipe(file);
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var json = JSON.parse(body);
    //S3からファイルをダウンロード
    download(json.data.accessKey,json.data.secretKey);
  } else {
    console.error("vault access is failure:" + error);
  }
}

//VaultからAWSキーを取得
request(options, callback);