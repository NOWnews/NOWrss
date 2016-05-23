const debug = require('debug')('NOWrss:line:uploadXml');
const co = require('co');
const moment = require('moment-timezone');

const getNewsFromMongo = require('./getNewsFromMongo');

module.exports = co.wrap(function*() {

    // 開始時間為 15 分鐘前
    let startTime = moment(Date.now()).add(-15, 'm');
    let endTime = moment(Date.now());

    // 轉換成 epoch time
    let startEpoch = Math.floor(new Date(startTime) / 1000);
    let endEpoch = Math.floor(new Date(endTime) / 1000);

    let news = yield getNewsFromMongo(startEpoch, endEpoch);
    debug('news = %j', news);

});