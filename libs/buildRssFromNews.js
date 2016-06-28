
const debug = require('debug')('NOWrss:libs:buildRssFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const js2xmlparser = require('js2xmlparser');
const _ = require('lodash');
const RSS = require('./RSSLib');

module.exports = co.wrap(function*(newsArray) {

    // debug('newsArray = %j', newsArray);

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

    /* loop over data and add to feed */
    _.forEach(newsArray, (news) => {
        let dateFormat = moment(news.field_release_date.value * 1000).format('YYYY/MM/DD');
        feed.item({
            title:  news.title,
            url: 'http://www.nownews.com/n/' + dateFormat + '/' + news._id,
            description: news.body.value,
            summary: news.body.summary,
            date: moment(news.field_release_date.value * 1000),
            subcategory: news.category
        });
    });

    // debug('articles xml = %j', xml);

    return yield Promise.resolve(feed.xml(true));
});
