
const debug = require('debug')('NOWrss:line:getNewsFromMongo');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const _ = require('lodash');

const MongoDB = Promise.promisifyAll(require('mongodb'));
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const getAllMainCategory = require('./getAllMainCategory');
const getNewsByTids = require('./getNewsByTids');

module.exports = co.wrap(function*(start, end) {

    if(!start) {
        return Promise.reject(new Error('要帶入 start 的 epoch 時間'));
    }

    if(!end) {
        return Promise.reject(new Error('要帶入 end 的 epoch 時間'));
    }

    // 轉換成 epoch time
    let startEpoch = Math.floor(start / 1000);
    let endEpoch = Math.floor(end / 1000);

    let db = yield MongoClient.connectAsync('mongodb://nowproduction:werocks@mongodb16.nownews.com.tw,mongodb15.nownews.com.tw,mongodb14.nownews.com.tw,mongodb18.nownews.com.tw/production');

    // 去 db 撈取所有 main category(主要分類) 的資料
    let mainCategories = yield getAllMainCategory();

    // 所有 main category(主要分類) 的 tid
    let mainTids = _.map(mainCategories, function(category) {
        return category.tid;
    });

    // tid 對應中文名稱
     var mainMappingObject = {};
    _.forEach(mainCategories, function(category) {
        mainMappingObject[category.tid] = category.name;
    });

    debug('mainTids = %j', mainTids);
    debug('mainMappingObject = %j', mainMappingObject);


    // 用 tid 與時間區間去撈取新聞
    let allNews = yield getNewsByTids(mainTids, startEpoch, endEpoch);

    // 將分類與新聞 mapping
    _.forEach(allNews, function(news) {
        news.category = mainMappingObject[news.field_main_category.tid];
    });

    return yield Promise.resolve(allNews);
});