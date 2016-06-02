
const debug = require('debug')('NOWrss:line:buildXmlFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const js2xmlparser = require('js2xmlparser');
const _ = require('lodash');

module.exports = co.wrap(function*(newsArray) {

    // debug('newsArray = %j', newsArray);

    let time = Math.floor(moment(Date.now()));

    let jsonData = {
        UUID: uuid.v4(),
        time: time
    };

    jsonData.article = _.map(newsArray, function(news) {

        let year = moment((news.field_release_date.value * 1000)).format('YYYY');
        let month = moment((news.field_release_date.value * 1000)).format('MM');
        let date = moment((news.field_release_date.value * 1000)).format('DD');

        let newsData = {
            ID: news._id,
            nativeCountry: 'TW',
            language: 'zh',
            publishCountries: {
                country: [
                    'TW'
                ]
            },
            excludedCountries: {
                country: [
                    'CN'
                ]
            },
            title: news.title,
            category: news.category,
            startYmdtUnix: (news.field_release_date.value * 1000),
            endYmdtUnix: moment((news.field_release_date.value * 1000)).add(5, 'y').format('x'),
            publishTimeUnix: (news.field_release_date.value * 1000),
            publishTime: moment((news.field_release_date.value * 1000)).format('YYYY/MM/DD HH:mm'),
            contents: {
                // image: {
                //     // title: news.title,
                //     description: news.title,
                //     url: 'imgs/' + news.image.fileName,
                //     // thumbnail: news.image.thumbnail || 'http://www.nownews.com/assets/images/logo.png'
                // },
                text: {
                    content: news.body.value
                }
            },
            author: 'NOWnews 今日新聞',
            sourceUrl: 'http://www.nownews.com/n/' + year + '/' + month + '/' + date + '/' + news._id
        };

        if(news.image && news.image.fileName) {
            newsData.contents.image = {};
            newsData.contents.image.description = news.title;
            newsData.contents.image.url = 'imgs/' + news.image.fileName;
        }
        // debug('newsData image = %j', newsData.contents.image);
        // debug('newsData = %j', newsData);

        // 判斷是否有圖片
        // if(news.image && news.image.fileName) {
        //     newsData.contents.image = {};
        //     newsData.contents.image.title = news.title;
        //     newsData.contents.image.description = news.title;
        //     newsData.contents.image.url = 'imgs/' + news.image.fileName;
        // }

        // 推薦新聞，目前先拿掉
        // if(news.refNews && news.refNews.length !== 0) {
        //     let refNewsData = _.map(news.refNews, function(refNews) {
        //         return {
        //             title: refNews.title,
        //             url: refNews.url,
        //             thumbnail: refNews.thumbnail
        //         };
        //     });

        //     newsData.contents.recommendArticles = {};
        //     newsData.contents.recommendArticles.article = refNewsData;
        // }
        // debug('newsData = %j', newsData);
        return newsData;
    });

    // debug('articles json = %j', jsonData);

    let xml = js2xmlparser('articles', jsonData);

    // debug('articles xml = %j', xml);

    return yield Promise.resolve(xml);
});