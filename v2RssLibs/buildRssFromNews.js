
const debug = require('debug')('NOWrss:v2RssLibs:buildRssFromNews');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const utils = require('./../utils');
const _ = require('lodash');
const chineseConv = require('chinese-conv');

module.exports = co.wrap(function*(newsArray, simplifiedChinese, template) {

    // debug('newsArray = %j', newsArray);
    debug('simplifiedChinese = %j', simplifiedChinese);

    // let feed;
    let items = [];
    let templateFile = '';
    let ISOTime = moment().tz('Asia/Taipei').format();

    // 選擇版型
    switch(template) {
        case 'LINE':
            templateFile = 'line';
            break;
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
        if(!news.shortTitle){ console.error('id: ' + news._id + ' 沒有下短標。'); }

        let mainPhotoBody = '';
        let mainPhotoDesc = ''
        let mainPhotoUrl = '';

        // 圖片
        if (news.MainPhoto && news.MainPhoto.isDeliver) {
            mainPhotoDesc = news.MainPhoto.desc || '';
            mainPhotoUrl = news.MainPhoto.url || '';
            mainPhotoBody = `<div class="main-photo"><img src="${mainPhotoUrl}" alt="${mainPhotoDesc}" width="320px;"><cite>${mainPhotoDesc}</cite></div>`;
        }

        // 最後傳進去的變數
        let description = news.content;
        let title = news.title;
        let shortTitle = news.shortTitle ? news.shortTitle : title;
        let author = news.newsBy;
        let summary = news.summary;
        let subcategory = news.MainMenu.name;

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
            url: 'http://www.nownews.com' + news.parseUrl,
            mainPhotoUrl: mainPhotoUrl,
            mainPhotoBody: mainPhotoBody,
            mainPhotoDesc: mainPhotoDesc,
            description: description,
            author: author,
            summary: summary,
            date: utils.dateFormat(news.startedAt, 'ddd DD MMM YYYY HH:mm:ss ZZ'),
            dateTime: news.startedAt,
            TaiwanMobileDate: utils.dateFormat(news.startedAt, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'),
            UTCdate: utils.dateFormat(news.startedAt, 'ddd, DD MMM YYYY HH:mm:ss [GMT]Z'),
            subcategory: subcategory
        });
    });

    return yield Promise.resolve({
        items: items,
        ISOTime: ISOTime,
        xml: `rssTemplate/${templateFile}.xml`
    });
});
