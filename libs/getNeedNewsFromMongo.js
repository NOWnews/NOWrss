/*
 * 帶入時間區間及塞選條件(陣列)，去跟 mongodb 要新聞資料
 */

const debug = require('debug')('NOWrss:libs:getNeedNewsFromMongo');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const _ = require('lodash');

const getAllMainCategory = require('./getAllMainCategory');
const checkBodyImageIsAuth = require('./checkBodyImageIsAuth');
const getRefNews = require('./getRefNews');
const redis = require('../redis');

module.exports = co.wrap(function*(start, end, searchCondition, channelId, isFacebookInstantArticle) {

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
    let mainCategories = yield redis.getMainCategoriesRedis();

    // 塞選後的 main category(主要分類) 的 tid
    let mainTids = [];
    // 塞選後的 tid 對應中文名稱
    let mainMappingObject = {};

    _.forEach(mainCategories, function(mainCategorie){
        if ( !searchCondition || searchCondition.indexOf(mainCategorie.name) !== -1 ){
            mainTids.push(mainCategorie.tid);
            mainMappingObject[mainCategorie.tid] = mainCategorie.name;
        }
    });

    debug('mainTids = %j', mainTids);
    debug('mainMappingObject = %j', mainMappingObject);

    // 用 tid 與時間區間去撈取新聞

    let allNews = yield redis.getRssIdByRedis(mainTids, startEpoch, endEpoch, channelId);

    debug('step 1 = %s', '撈取新聞');
    debug('總共撈到 %d 則', allNews.length);
    // 找不到新聞就直接出去了
    if(allNews.length === 0) {
        return yield Promise.resolve([]);
    }

    debug('step 3 = %s', '將分類與新聞 mapping，並確認新聞內文圖是否可以外送');
    // 將分類與新聞 mapping
    _.forEach(allNews, function(news, index) {
        // 如果沒有此類別就刪掉
        news.category = mainMappingObject[news.field_main_category.tid];

        if(!news.category){
            delete allNews[index];
        }

        if(isFacebookInstantArticle !== true) {
            checkBodyImageIsAuth(news);
        }
    });

    // debug('allNews = %j', allNews);
    return yield Promise.resolve(allNews);
});
