const debug = require('debug')('NOWrss:libs:buildRssFromNews');

const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
const utils = require('./../utils');

module.exports = co.wrap(function*(newsArray) {

    let items = [];
    console.log(newsArray, 'L11')
    _.forEach(newsArray, function(news) {

        items.push({
            title: news.title,
            link: 'http://www.nownews.com' + news.parseUrl,
            guid: news._id,
            date: utils.dateFormat(news.startedAt, 'YYYY/MM/DD HH:mm:ss'),
            isoDate: utils.dateFormat(news.startedAt),
            author: news.newsBy,
            description: news.summary,
            imgUrl: news.MainPhoto.url || '',
            imgTitle: news.MainPhoto.desc || news.title,
            body: news.content
        });
    });

    return yield Promise.resolve({
        items: items,
        xml: 'rssTemplate/facebookInstantArticle.xml'
    });
});
