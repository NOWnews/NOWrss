
const debug = require('debug')('NOWrss:libs:buildRssFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const js2xmlparser = require('js2xmlparser');
const _ = require('lodash');
const chineseConv = require('chinese-conv');
const rssDefaultTp = require('./rssDefaultTp');
const rssYahooTp = require('./rssYahooTp');

module.exports = co.wrap(function*(newsArray, simplifiedChinese, template) {

    // debug('newsArray = %j', newsArray);
    debug('simplifiedChinese = %j', simplifiedChinese);

    let feedOption = {
      title: 'NOWnews 今日新聞網',
      description: 'Latest news from www.nownews.com',
      site_url: 'http://www.nownews.com',
      image_url: 'http://static.nownews.com/ad2004/141107-170318-3250p.png',
      copyright: 'Copyright 2013, NOWnews Network Inc.',
      language: 'zh-tw',
      pubDate: new Date(),
      ttl: '60'
    };

    let feed;
    if (template === 'YAHOO'){
      feed = new rssYahooTp(feedOption);
    } else {
      feed = new rssDefaultTp(feedOption);
    }

    /* loop over data and add to feed */
    _.forEach(newsArray, (news) => {
        // 沒有新聞的話，就離開
        if(!news){ return true; }

        let dateFormat = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD');
        let mainPhotoBody = news.image.body || '';

        // 最後傳進去的變數
        let description = mainPhotoBody + news.body.value.replace(/src="http:\/\/e.nownews.com\/sites\/default\/files/g, 'src="http://imgapi.nownews.com/?w=600&q=80&src=http://s.nownews.com');
        let title = news.title;
        let author = news.field_newsby.value;
        let summary = news.body.summary;
        let subcategory = news.category;

        // 確認語系
        if (simplifiedChinese) {
            description = chineseConv.sify(description);
            title = chineseConv.sify(title);
            author = chineseConv.sify(author);
            summary = chineseConv.sify(summary);
            subcategory = chineseConv.sify(subcategory);
        }

        feed.item({
            title:  title,
            url: 'http://www.nownews.com/n/' + dateFormat + '/' + news._id,
            description: description,
            author: author,
            summary: summary,
            date: moment(news.field_release_date.value * 1000 ).tz('Asia/Taipei').format(),
            subcategory: subcategory
        });
    });

    // debug('articles xml = %j', xml);
    let xml = feed.xml(true);
    return yield Promise.resolve(xml);
});
