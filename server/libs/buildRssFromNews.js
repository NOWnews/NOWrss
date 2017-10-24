
const debug = require('debug')('NOWrss:libs:buildRssFromNews');

import Promise from 'bluebird';
import moment from 'moment-timezone';
import { dateFormat } from './../utils';
import _ from 'lodash';
import cheerio from 'cheerio';
import { sify } from 'chinese-conv';

module.exports = async (newsArray, simplifiedChinese, template) => {

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
        case 'DEFAULTDESC':
            templateFile = 'defaultdesc';
            break;
        case 'SINATW':
            templateFile = 'sina-tw';
            break;
        default:
            templateFile = 'default';
    }



    /* loop over data and add to feed */
    items = await Promise.all(_.map(newsArray, async (news)=>{
        // 沒有新聞的話，就離開
        if(!news){ return true; }
        if(!news.shortTitle){ console.error('id: ' + news._id + ' 沒有下短標。'); }

        let mainPhotoBody = '';
        let mainPhotoDesc = ''
        let mainPhotoUrl = '';
        let TaiwanMobileMainPhoto = '';
        // 圖片
        if (news.MainPhoto && news.MainPhoto.isDeliver) {
            mainPhotoDesc = news.MainPhoto.desc || '';
            mainPhotoUrl = news.MainPhoto.googleCDN || `https://imgapiv2.nownews.com/?h=545&q=70&src=${news.MainPhoto.url}` || '';
            mainPhotoBody = `<div class="main-photo"><img src="${mainPhotoUrl}" alt="${mainPhotoDesc}" /><cite>${mainPhotoDesc}</cite></div>`;
            TaiwanMobileMainPhoto = news.MainPhoto.url;
        }

        // yahoo 濾掉 影片
        if (template === 'YAHOO'){
            let $ = cheerio.load( news.content , { decodeEntities: false });
            $('iframe').filter(function(i, el) {
                let iframe = $(el).parent('p').html();
                console.log(iframe, 'L69')
                if (iframe.indexOf('youtube') > -1){
                    $(el).closest('p').remove();
                }
            });
            news.content = $.html();
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
            description = sify(description);
            mainPhotoBody = sify(mainPhotoBody);
            title = sify(title);
            author = sify(author);
            summary = sify(summary);
            subcategory = sify(subcategory);
            shortTitle = sify(shortTitle);
        }

        // 濾掉特殊字元 叫做 backspace 在正則中以 [\b] 表示
        description = description.replace(/[\b]/g, '');
        mainPhotoBody = mainPhotoBody.replace(/[\b]/g, '');
        mainPhotoBody = mainPhotoBody.replace(/[\b]/g, '');
        title = title.replace(/[\b]/g, '');
        author = author.replace(/[\b]/g, '');
        summary = summary.replace(/[\b]/g, '');
        subcategory = subcategory.replace(/[\b]/g, '');
        shortTitle = shortTitle.replace(/[\b]/g, '');

        return {
            id: news.sn,
            title:  title,
            shortTitle: shortTitle,
            url: 'https://www.nownews.com' + news.parseUrl,
            mainPhotoUrl: mainPhotoUrl,
            mainPhotoBody: mainPhotoBody,
            mainPhotoDesc: mainPhotoDesc,
            description: description,
            author: author,
            summary: summary,
            sameCatNewsHtml: news.sameCatNewsHtml || '',
            date: dateFormat(news.startedAt, 'ddd DD MMM YYYY HH:mm:ss ZZ'),
            dateTime: news.startedAt,
            TaiwanMobileDate: dateFormat(news.startedAt, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'),
            UTCdate: dateFormat(news.startedAt, 'ddd, DD MMM YYYY HH:mm:ss [GMT]Z'),
            subcategory: subcategory,
            TaiwanMobileMainPhoto: TaiwanMobileMainPhoto,
            updateTimeUnix: moment.tz(news.updatedAt, 'Asia/Taipei').valueOf()
        };
    }));

    return await Promise.resolve({
        items: items,
        ISOTime: ISOTime,
        xml: `rssTemplate/${templateFile}.xml`
    });
};
