/*
 * 帶入時間區間及塞選條件(陣列)，去跟 NOWnews-api 要新聞資料
 */

const debug = require('debug')('NOWrss:libs:getNeedNewsFromAPI');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import cheerio from 'cheerio';
import _ from 'lodash';
import is from 'is_js';
import querystring from 'querystring';
import redis from '../redis';

module.exports = async(startTime, endTime, categories, subWebsiteList, channelId, isFacebookInstantArticle, template) => {

    debug('categories = %j',categories)
    debug('subWebsiteList = %j',subWebsiteList)

    try {
        if (!startTime) {
            return Promise.reject(new Error('要帶入 start 的 epoch 時間'));
        }

        if (!endTime) {
            return Promise.reject(new Error('要帶入 end 的 epoch 時間'));
        }

        //取得 Redis News Data
        let allNewsRedis = await redis.getValue(`${channelId}`);
        if (is.array(allNewsRedis) && allNewsRedis.length !== 0) {
            debug(' Redis 共撈了 %s 則新聞', allNewsRedis.length);
            return allNewsRedis;
        }

        let limit = 60;
        let formatCategories = querystring.stringify({"categories": categories});
        let url = `/rss?start=${startTime}&end=${endTime}&limit=${limit}&sort=-startedAt&${formatCategories}`;

        let { data: allNews } = await axios.get(url);

        // 加入子項目
        let subWebsiteData = [];
        for (let subWebsiteName of subWebsiteList){
            let subLimit = 10; //預設10篇
            let subWebsiteUrl = `/subRss/${subWebsiteName}?start=${startTime}&end=${endTime}&limit=${subLimit}&sort=-startedAt`;
            let { data: newsDate } = await axios.get(subWebsiteUrl);
            subWebsiteData = _.concat(subWebsiteData, newsDate)
        }

        allNews = _.concat(allNews, subWebsiteData);
        allNews = _.reverse(_.sortBy(allNews, ['formatStartedAt']));

        debug('共撈了 %s 則新聞', allNews.length);
        if(!isFacebookInstantArticle){
            allNews = await Promise.all(_.map(allNews, async (news) => {
                // 新浪台灣 內文最後加兩篇同分類的最新新聞
                if (template === 'SINATW' || template === 'YAHOO_2' ){
                    let needNewsNumber = 2;
                    let url = `/news/${news.sn}/relations`; //這端點會回覆3篇相關新聞
                    let { data : sameCatNews } = await axios.get(url);
                    sameCatNews = sameCatNews.splice(0,needNewsNumber);  // 目前只要加上2篇
                    if(sameCatNews){
                        news.sameCatNews = sameCatNews;
                    }
                }

                //主圖
                if(news.MainPhoto && news.MainPhoto.isDeliver===false){
                    delete news.MainPhoto;
                }

                //內容圖
                let $ = cheerio.load( news.content , { decodeEntities: false });
                let iframeSrc = '';

                $('img').filter((i, el) => {
                    if($(el).data('isdeliver') === false){
                        // 不外送的圖片從他外層的 P 整個刪掉
                        $(el).closest('p').remove();
                    } else {
                        let imgUrl = $(el).attr('src').indexOf('nownews') < 0? $(el).attr('src'): $(el).attr('src');
                        $(el).attr('src', imgUrl);
                    }
                });

                news.content = $.html();

                // 圖片處理
                news.content = news.content.replace(/(<img.*?>)/mg, (item) => {
                    return item.replace(/(?=.?)>$/, '/>');
                });

                return news;
            }));
        }
        // debug('allNews = %j ', allNews);

        //更新 Redis News Data
        let updateRedisAllNews = await redis.setValue(`${channelId}`, allNews, 360);

        return updateRedisAllNews;
    } catch(err) {
        return console.error(err);
    }
};
