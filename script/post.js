var fs = require('fs');
//削除するファイルのパス
var filePath = process.argv[2];

fs.unlink(filePath, function (err) {
  if (err) {
    console.error(err);
  }
  console.log('successfully deleted. path:' + filePath);
});