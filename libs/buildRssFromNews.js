
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

    // let feed;
    let items = [];
    let templateFile = '';
    let ISOTime = moment().tz('Asia/Taipei').format();

    switch(template) {
        case 'YAHOO':
            templateFile = 'yahoo';
            break;
        case 'FACEBOOK':
            templateFile = 'default';
            break;
        default:
            templateFile = 'default';
    }

    console.log('L34', template);
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

        items.push({
            title:  title,
            url: 'http://www.nownews.com/n/' + dateFormat + '/' + news._id,
            description: description,
            author: author,
            summary: summary,
            date: moment(news.field_release_date.value * 1000 ).tz('Asia/Taipei').toString(),
            subcategory: subcategory
        });
    });

    return yield Promise.resolve({
        items: items,
        ISOTime: ISOTime,
        xml: `rssTemplate/${templateFile}.xml`
    });
});
