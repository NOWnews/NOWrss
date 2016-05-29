/*
 * 帶入時間區間，去跟 mongodb 要新聞資料
 */

const debug = require('debug')('NOWrss:line:getNewsFromMongo');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const _ = require('lodash');

const getAllMainCategory = require('./getAllMainCategory');
const getNewsByTids = require('./getNewsByTids');
const getNewsImageFromNodeId = require('./getNewsImageFromNodeId');
const checkBodyImageIsAuth = require('./checkBodyImageIsAuth');
const getRefNews = require('./getRefNews');

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

    debug('step 0 = %s', '撈取所有 main category');
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

    // debug('mainTids = %j', mainTids);
    // debug('mainMappingObject = %j', mainMappingObject);


    // 用 tid 與時間區間去撈取新聞
    let allNews = yield getNewsByTids(mainTids, startEpoch, endEpoch);

    debug('step 1 = %s', '撈取新聞');
    debug('總共撈到 %d 則', allNews.length);
    // 找不到新聞就直接出去了
    if(allNews.length === 0) {
        return yield Promise.resolve([]);
    }

    // 將分類與新聞 mapping
    _.forEach(allNews, function(news) {
        news.category = mainMappingObject[news.field_main_category.tid];
    });

    debug('step 2 = %s', '找尋新聞主圖');
    // 找尋新聞主圖
    allNews = yield Promise.map(allNews, function(news) {
        return getNewsImageFromNodeId(news);
    })
    .then(function(newsHaveImage) {
        return Promise.resolve(newsHaveImage);
    });

    debug('step 3 = %s', '確認新聞內文圖是否可以外送');
    // 確認新聞內文圖是否可以外送
    allNews = yield Promise.map(allNews, function(news) {
        return checkBodyImageIsAuth(news);
    })
    .then(function(checkedNews) {
        return Promise.resolve(checkedNews);
    });

    debug('step 4 = %s', '找出推薦新聞');
    // 找出推薦新聞
    allNews = yield Promise.map(allNews, function(news) {
        return getRefNews(news);
    })
    .then(function(updateRefNews) {
        debug('updateRefNews = %j', updateRefNews);
        return Promise.resolve(updateRefNews);
    });
    // 確認新聞內文圖是否可以外送
    // allNews = yield checkBodyImageIsAuth(allNews);

    // debug('allNews = %j', allNews);

    return yield Promise.resolve(allNews);
});