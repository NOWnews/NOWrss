
const debug = require('debug')('NOWrss:libs:buildRssFromNews');

import Promise from 'bluebird';
import _ from 'lodash';
import utils from './../utils';

module.exports = async (newsArray) => {

    try {
        let items = [];
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

        return await Promise.resolve({
            items: items,
            xml: 'rssTemplate/facebookInstantArticle.xml'
        });

    } catch(err) {
        return Promise.reject(err);
    }
};
