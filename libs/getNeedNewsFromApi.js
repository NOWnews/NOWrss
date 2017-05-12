/*
 * 帶入時間區間及塞選條件(陣列)，去跟 NOWnews-api 要新聞資料
 */

const debug = require('debug')('NOWrss:libs:getNeedNewsFromAPI');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const _ = require('lodash');
const is = require('is_js');
const querystring = require('querystring');
const checkBodyImageIsAuth = require('./checkBodyImageIsAuth');
const getRefNews = require('./getRefNews');
const newsToOldFormat = require('./newsToOldFormat')
const imagesIsDeliveryFilter = require('./imagesIsDeliveryFilter')
const redis = require('../redis');

module.exports = async(startEpoch, endEpoch, categories, channelId,isFacebookInstantArticle) => {
    debug('categories',categories)
    if (!startEpoch) {
        return Promise.reject(new Error('要帶入 start 的 epoch 時間'));
    }

    if (!endEpoch) {
        return Promise.reject(new Error('要帶入 end 的 epoch 時間'));
    }

    // get data from redis
    let allNewsRedis = await redis.getValue(channelId);
    if (is.array(allNewsRedis) && allNewsRedis.length !== 0) {
            return allNewsRedis;
    }
   
    let limit = 60;
    let queryCategories = querystring.stringify({"categories": JSON.stringify(categories)});
    let url = `/rss?start=${startEpoch}&end=${endEpoch}limit=${limit}&${queryCategories}`;

    let { data: allNews } = await axios.get(url);

    if(!isFacebookInstantArticle){
        allNews = await imagesIsDeliveryFilter(allNews);
    }
    
    debug('before format allNews %j' , allNews);
    allNews = await newsToOldFormat(allNews,isFacebookInstantArticle);
    debug('after format allNews = %j', allNews);

    //update redis data
    let updateRedisAllNews = await redis.setValue(channelId, allNews, 360);

    return updateRedisAllNews;
};


// function imagesIsDeliveryFilter(allNews){
//         return allNews.map((news, i) => {
//             //主圖
//             if(news.MainPhoto.isDeliver===false){
//                 delete news.MainPhoto.isDeliver;
//             }
//             //內容圖
            
//         }
//     }