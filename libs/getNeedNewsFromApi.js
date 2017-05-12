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
const redis = require('../redis');

module.exports = async(startEpoch, endEpoch, categories, channelId, isFromRedis) => {
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
    debug('before format allNews %j' , allNews);
    allNews = toOldFormat(allNews);
    debug('after format allNews = %j', allNews);

    //update redis data
    let updateRedisAllNews = await redis.setValue(channelId, allNews, 360);

    return updateRedisAllNews;
};



function toOldFormat(allNews) {
        return allNews.map((news, i) => {
            
            //主分類+所有子分類都放進categories
            let categories = (news.Menus.map(menu => menu['name']));
            categories.unshift(news.MainMenu.name);

            return {
                "_id": news.sn,
                "title": news.title,
                "body": {
                    "summary": news.summary,
                    "value": "",
                    "format": "full_html"
                },
                "field_free_body": {
                    "value": news.content,
                    "format": "free_style"
                },
                "field_news_ref": [],
                "field_newsby": {
                    "value": news.newsby
                },
                "field_release_date": {
                    "value": (new Date(news.createdAt).getTime()) / 1000
                },
                "field_short_title": {
                    "value": news.shortTitle
                },
                "field_main_category": {
                    "tid": ""
                },
                "image": {
                    "title": news.MainPhoto ? news.MainPhoto.title : "",
                    "description": news.MainPhoto ? news.MainPhoto.desc : "",
                    "uri": news.MainPhoto ? news.MainPhoto.url : "",
                    "url": news.MainPhoto ? news.MainPhoto.url : "",
                    "originalUrl": news.MainPhoto ? news.MainPhoto.url : "",
                    "body": news.MainPhoto ? news.MainPhoto.desc : ""
                },
                "category": categories
            }


        });
    }