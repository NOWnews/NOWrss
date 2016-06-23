
const debug = require('debug')('NOWrss:libs:buildRssFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const js2xmlparser = require('js2xmlparser');
const _ = require('lodash');
const RSS = require('./RSSLib');

module.exports = co.wrap(function*(newsArray) {

    debug('newsArray = %j', newsArray);

    var feed = new RSS({
        title: 'NOWnews 今日新聞網',
        description: 'Latest news from www.nownews.com',
        site_url: 'http://www.nownews.com',
        image_url: 'http://static.nownews.com/ad2004/141107-170318-3250p.png',
        copyright: 'Copyright 2013, NOWnews Network Inc.',
        language: 'zh-tw',
        pubDate: new Date(),
        ttl: '60',
    });

    newsArray = newsArray[0];
    /* loop over data and add to feed */
    feed.item({
        title:  newsArray.title,
        url: 'http://www.nownews.com/n/2016/06/23/2143858',
        description: newsArray.body.value,
        summary: newsArray.body.summary,
        date: new Date(),
        subcategory: newsArray.category
    });


    // let time = Math.floor(moment(Date.now()));
    //
    // let jsonData = {
    //     UUID: uuid.v4(),
    //     time: time
    // };
    //
    // jsonData.article = _.map(newsArray, function(news) {
    //
    //     let year = moment((news.field_release_date.value * 1000)).format('YYYY');
    //     let month = moment((news.field_release_date.value * 1000)).format('MM');
    //     let date = moment((news.field_release_date.value * 1000)).format('DD');
    //
    //     let newsData = {
    //         ID: news._id,
    //         nativeCountry: 'TW',
    //         language: 'zh',
    //         publishCountries: {
    //             country: [
    //                 'TW'
    //             ]
    //         },
    //         excludedCountries: {
    //             country: [
    //                 'CN'
    //             ]
    //         },
    //         title: news.title,
    //         category: news.category,
    //         startYmdtUnix: (news.field_release_date.value * 1000),
    //         endYmdtUnix: moment((news.field_release_date.value * 1000)).add(5, 'y').format('x'),
    //         publishTimeUnix: (news.field_release_date.value * 1000),
    //         publishTime: moment((news.field_release_date.value * 1000)).format('YYYY/MM/DD HH:mm'),
    //         contents: {
    //             // image: {
    //             //     // title: news.title,
    //             //     description: news.title,
    //             //     url: 'imgs/' + news.image.fileName,
    //             //     // thumbnail: news.image.thumbnail || 'http://www.nownews.com/assets/images/logo.png'
    //             // },
    //             text: {
    //                 content: news.body.value
    //             }
    //         },
    //         author: 'NOWnews 今日新聞',
    //         sourceUrl: 'http://www.nownews.com/n/' + year + '/' + month + '/' + date + '/' + news._id
    //     };
    //
    //     if(news.image && news.image.fileName) {
    //         newsData.contents.image = {};
    //         newsData.contents.image.description = news.title;
    //         newsData.contents.image.url = 'imgs/' + news.image.fileName;
    //     }
    //     // debug('newsData image = %j', newsData.contents.image);
    //     // debug('newsData = %j', newsData);
    //
    //     return newsData;
    // });
    //
    // // debug('articles json = %j', jsonData);
    //
    // let xml = js2xmlparser('articles', jsonData);

    // debug('articles xml = %j', xml);

    return yield Promise.resolve(feed.xml(true));
});
