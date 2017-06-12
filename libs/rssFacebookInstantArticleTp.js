
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
const moment = require('moment-timezone');
const debug = require('debug')('NOWrss:libs:buildRssFromNews');

const cheerio = require('cheerio');

module.exports = co.wrap(function*(newsArray) {

    let items = [];
    _.forEach(newsArray, function(news) {
        if(!news.image.url){
            return true;
        }

        // 即時文章 針對 img 跟 iframe
        let $ = cheerio.load(news.body.value, {decodeEntities: false});
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

        news.body.value = $.html();
        // -----

        let dateFormat = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD');

        items.push({
            title: news.title,
            link: `http://www.nownews.com/n/${dateFormat}/${news._id}`,
            guid: news._id,
            date: moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss'),
            isoDate: moment(news.field_release_date.value * 1000 ).tz('Asia/Taipei').format(),
            author: news.field_newsby.value,
            description: news.body.summary,
            imgUrl: news.image.url,
            imgTitle: news.image.title,
            body: news.body.value
        });
    });

    return yield Promise.resolve({
        items: items,
        xml: 'rssTemplate/facebookInstantArticle.xml'
    });
});
