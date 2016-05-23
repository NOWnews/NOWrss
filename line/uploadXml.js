const co = require('co');

const getNewsFromMongo = require('./getNewsFromMongo');

module.exports = co.wrap(function*() {

    // 開始時間為 15 分鐘前
    var startTime = moment(Date.now()).add(-15, 'm');
    var endTime = moment(Date.now());

    // 轉換成 epoch time
    var startEpoch = Math.floor(new Date(startTime) / 1000);
    var endEpoch = Math.floor(new Date(endTime) / 1000);

    let news = yield getNewsFromMongo(startEpoch, endEpoch);

});