
const debug = require('debug')('NOWrss:libs:buildRssFromNews');

import Promise from 'bluebird';
import _ from 'lodash';
import cheerio from 'cheerio';
import utils from './../utils';

module.exports = async (newsArray) => {

    try {
        let items = [];
        _.forEach(newsArray, function(news) {

            // 即時文章 針對 img 跟 iframe
            let $ = cheerio.load(news.content, {decodeEntities: false});
            $('img').filter(function(i, el) {
                let src = el.attribs.src;
                let desc = $(el).parent('p').find('cite').text() || $(el).parent('p').text() || news.title;
                $(el)
                    .parent('p')
                    .replaceWith(`<figure><img src="${src}" /><figcaption>${desc}</figcaption></figure>`);
            });
            $('iframe').filter(function(i, el) {
                let iframe = $(el).parent('p').html();
                $(el)
                    .parent('p')
                    .replaceWith(`<figure class="op-interactive">${iframe}</figure>`);
            });
            news.content = $.html();
            // ---

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
