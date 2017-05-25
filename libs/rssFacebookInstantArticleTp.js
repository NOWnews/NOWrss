
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

        // 即時文章的圖片拿掉外層 P
        let $ = cheerio.load(news.body.value, {decodeEntities: false});
        $('img').filter(function(i, el) {
            $(el).parent('p').replaceWith('<div>' + $( this ).html() + '</div>').find('cite').replaceWith('<figcaption>' + $( this ).text() + '</figcaption>');
        });
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
