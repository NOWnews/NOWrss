
const co = require('co');
const Promise = require('bluebird');
const request = require('request-promise');
const fs = require('fs');

const debug = require('debug')('NOWrss:line:downloadImage');

module.exports = co.wrap(function*(url, folderName, fileName) {

    // 確認資料夾是否存在，如果沒有資料夾就開一個
    if(!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }

    let imageFile = folderName + '/' + fileName;

    let imageBinary = yield request.get(url, { encoding: 'binary' })
        .then(function(res) {
            return Promise.resolve(res);
        });

    // 寫入圖片檔案
    fs.writeFileSync(imageFile, imageBinary, 'binary');

    return yield Promise.resolve({
        url: url,
        folderName: folderName,
        fileName: fileName,
        fullPath: imageFile
    });
});