
const debug = require('debug')('NOWrss:line:buildXmlFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const _ = require('lodash');

module.exports = co.wrap(function*(newsArray) {

    let time = Math.floor(moment(Date.now()));

    let jsonData = {
        UUID: uuid.v4(),
        time: time
    };

    jsonData.article = _.map(newsArray, function(news) {

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
            publishTimeUnix: (news.field_release_date.value * 1000),
            publishTime: moment((news.field_release_date.value * 1000)).format('YYYY/MM/DD hh:mm'),
            content: {
                image: {
                    title: news.title,
                    description: news.title,
                    url: news.image.url || 'http://www.nownews.com/assets/images/logo.png',
                    thumbnail: news.image.thumbnail || 'http://www.nownews.com/assets/images/logo.png'
                },
                text: {
                    content: news.body.value
                }
            },
            author: 'NOWnews 今日傳媒',

        };

        if(news.refNews && news.refNews.length !== 0) {
            let refNewsData = _.map(news.refNews, function(refNews) {
                return {
                    title: refNews.title,
                    url: refNews.url,
                    thumbnail: refNews.thumbnail
                };
            });

            newsData.content.recommendArticles = {};
            newsData.content.recommendArticles.article = refNewsData;
        }

        return newsData;
    });

    return jsonData;
});