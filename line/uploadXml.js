const debug = require('debug')('NOWrss:line:uploadXml');
const co = require('co');
const moment = require('moment-timezone');

const getNewsFromMongo = require('./getNewsFromMongo');
// const getNewsTaxonomyTerm = require('./getNewsTaxonomyTerm');
const buildXmlFromNews = require('./buildXmlFromNews');

module.exports = co.wrap(function*() {

    // 開始時間為 15 分鐘前
    // let startTime = moment(Date.now()).add(-15, 'm');
    let startTime = moment(Date.now()).add(-2, 'h');
    let endTime = moment(Date.now());

    debug('start = %s', moment(startTime).format('YYYY/MM/DD HH:mm:ss'));
    debug('end = %s', moment(endTime).format('YYYY/MM/DD HH:mm:ss'));

    // 取得所有新聞資料
    let news = yield getNewsFromMongo(startTime, endTime);
    debug('news = %j', news);

    // let formatNews = yield getNewsTaxonomyTerm(news);
    // debug('formatNews = %j', formatNews);

    let foo = yield buildXmlFromNews(news);
    debug('foo = %j', foo);

});