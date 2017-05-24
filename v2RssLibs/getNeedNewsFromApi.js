/*
 * 帶入時間區間及塞選條件(陣列)，去跟 NOWnews-api 要新聞資料
 */

const debug = require('debug')('NOWrss:v2RssLibs:getNeedNewsFromAPI');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const cheerio = require('cheerio');
const _ = require('lodash');
const is = require('is_js');
const querystring = require('querystring');
const redis = require('../redis');

module.exports = async(startEpoch, endEpoch, categories, channelId, isFacebookInstantArticle) => {

    debug('categories = %j',categories)

    if (!startEpoch) {
        return Promise.reject(new Error('要帶入 start 的 epoch 時間'));
    }

    if (!endEpoch) {
        return Promise.reject(new Error('要帶入 end 的 epoch 時間'));
    }

    //取得 Redis News Data
    //TODO v2 的部分加上前綴字
    let allNewsRedis = await redis.getValue(`v2${channelId}`);
    if (is.array(allNewsRedis) && allNewsRedis.length !== 0) {
        return allNewsRedis;
    }

    let limit = 60;
    let formatCategories = querystring.stringify({"categories": categories});
    let url = `/rss?start=${startEpoch}&end=${endEpoch}&limit=${limit}&${formatCategories}`;

    let { data: allNews } = await axios.get(url);

    debug('共撈了 %s 則新聞', allNews.length);

    if(!isFacebookInstantArticle){
        allNews = _.map(allNews,(news) => {

            //主圖
            if(news.MainPhoto && news.MainPhoto.isDeliver===false){
                delete news.MainPhoto;
            }

            //內容圖
            let $ = cheerio.load( news.content , { decodeEntities: false });

            $('img').filter(function(i, el) {
                if($(el).data('isdeliver')===false){
                    $(el).closest('p').remove();
                }
            });

            news.content = $.html();
            debug('new.content',news.content)
            return news;
        });
    }
    debug('allNews = %j ', allNews);

    //更新 Redis News Data
    //TODO v2 的部分加上前綴字
    let updateRedisAllNews = await redis.setValue(`v2${channelId}`, allNews, 360);

    return updateRedisAllNews;
};
