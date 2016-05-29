
const debug = require('debug')('NOWrss:line:buildXmlFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const js2xmlparser = require('js2xmlparser');
const _ = require('lodash');

module.exports = co.wrap(function*(newsArray) {

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
            publishTimeUnix: (news.field_release_date.value * 1000),
            publishTime: moment((news.field_release_date.value * 1000)).format('YYYY/MM/DD HH:mm'),
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
            sourceUrl: 'http://www.nownews.com/n/' + year + '/' + month + '/' + date + '/' + news._id
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

    let xml = js2xmlparser('articles', jsonData, {
        useCDATA: true
    });

    // debug('xml = %s', xml);
    // debug('xml = %s', xml);
    // console.log(xml);

    return yield Promise.resolve(xml);
    // return jsonData;
});