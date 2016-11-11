
const debug = require('debug')('NOWrss:libs:buildRssFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const js2xmlparser = require('js2xmlparser');
const _ = require('lodash');
const chineseConv = require('chinese-conv');

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
        case 'TAIWANMOBILE':
            templateFile = 'taiwan-mobile';
            break;
        case 'SOCIAL':
            templateFile = 'social';
            break;
        default:
            templateFile = 'default';
    }

    /* loop over data and add to feed */
    _.forEach(newsArray, (news) => {
        // 沒有新聞的話，就離開
        if(!news){ return true; }

        let dateFormat = moment(news.field_release_date.value * 1000).tz('Asia/Taipei').format('YYYY/MM/DD');
        let mainPhotoBody = news.image.body || '';
        let mainPhotoUrl = news.image.originalUrl || '';

        // 最後傳進去的變數
        let description = news.body.value.replace(/src="http:\/\/e.nownews.com\/sites\/default\/files/g, 'src="http://imgapi.nownews.com/?w=600&q=80&src=http://s.nownews.com');
        let title = news.title;
        let shortTitle = news.field_short_title.value;
        let author = news.field_newsby.value;
        let summary = news.body.summary;
        let subcategory = news.category;

        // 確認語系
        if (simplifiedChinese) {
            description = chineseConv.sify(description);
            mainPhotoBody = chineseConv.sify(mainPhotoBody);
            title = chineseConv.sify(title);
            author = chineseConv.sify(author);
            summary = chineseConv.sify(summary);
            subcategory = chineseConv.sify(subcategory);
        }

        items.push({
            id: news._id,
            title:  title,
            shortTitle: shortTitle,
            url: 'http://www.nownews.com/n/' + dateFormat + '/' + news._id,
            mainPhotoUrl: mainPhotoUrl,
            mainPhotoBody: mainPhotoBody,
            description: description,
            author: author,
            summary: summary,
            date: moment(news.field_release_date.value * 1000 ).tz('Asia/Taipei').format('ddd DD MMM YYYY HH:mm:ss ZZ'),
            TaiwanMobileDate: moment(news.field_release_date.value * 1000 ).tz('Asia/Taipei').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'),
            UTCdate: moment(news.field_release_date.value * 1000 ).tz('Asia/Taipei').format('ddd, DD MMM YYYY HH:mm:ss [GMT]Z'),
            subcategory: subcategory
        });
    });

    return yield Promise.resolve({
        items: items,
        ISOTime: ISOTime,
        xml: `rssTemplate/${templateFile}.xml`
    });
});
