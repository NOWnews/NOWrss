/*
 * 帶入時間區間及塞選條件(陣列)，去跟 mongodb 要新聞資料
 */

const debug = require('debug')('NOWrss:libs:getNeedNewsFromAPI');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const _ = require('lodash');
const querystring = require('querystring');
const checkBodyImageIsAuth = require('./checkBodyImageIsAuth');
const getRefNews = require('./getRefNews');
const redis = require('../redis');

module.exports = async (startEpoch, endEpoch, categories, channelId, isFacebookInstantArticle) => {

    if (!startEpoch) {
        return Promise.reject(new Error('要帶入 start 的 epoch 時間'));
    }

    if (!endEpoch) {
        return Promise.reject(new Error('要帶入 end 的 epoch 時間'));
    }

    let limit = 60;
    let queryCategories = querystring.stringify({
        "categories": JSON.stringify(categories)
    });
    let devUrl = `/rss?limit=${limit}&${queryCategories}`;
    // let url = `/rss?start=${startEpoch}&end=${endEpoch}limit=${limit}&${queryCategories}`;
    let { data: allNews } = await axios.get(devUrl);
    debug('before format allNews %j' , allNews);
    allNews = toOldFormat(allNews);
    
    function toOldFormat(allNews) {
        return allNews.map((news,i) => {
        
            let categories = (news.Menus.map(menu=>menu['name']));
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
                    "value": (new Date(news.createdAt).getTime())/1000
                },
                "field_short_title": {
                    "value": news.shortTitle
                },
                "field_main_category": {
                    "tid": ""
                },
                "image": {
                    "title": news.MainPhoto?news.MainPhoto.title:"",
                    "description": news.MainPhoto?news.MainPhoto.desc:"",
                    "uri": news.MainPhoto?news.MainPhoto.url:"",
                    "url": news.MainPhoto?news.MainPhoto.url:"",
                    "originalUrl": news.MainPhoto?news.MainPhoto.url:"",
                    "body": news.MainPhoto?news.MainPhoto.desc:""
                },
                "category": categories
            }


        });
    }
    
    debug('allNews = %j', allNews);

    return allNews;
};