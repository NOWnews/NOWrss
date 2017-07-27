
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
                    .replaceWith(`<figure data-feedback="fb:likes, fb:comments"><img src="${src}" /><figcaption class="aspect-fit-only"><h1>${desc}</h1></figcaption></figure>`);
            });
            $('iframe').filter(function(i, el) {
                let iframe = $(el).parent('p').html();
                $(el)
                    .parent('p')
                    .replaceWith(`<figure class="op-interactive">${iframe}</figure>`);
            });
            news.content = $.html();

            // 濾掉特殊字元 叫做 backspace 在正則中以 [\b] 表示
            news.content = news.content.replace(/[\b]/g, '');
            news.title = news.title.replace(/[\b]/g, '');
            news.summary = news.summary.replace(/[\b]/g, '');
            // ---

            if (news.MainVideo && news.MainVideo.videoFrom === 'EXTERNAL') {
                let iframe;
                if (news.MainVideo.url.indexOf('facebook') > -1) {
                    let id = news.MainVideo.url.slice(-2,-1);
                    iframe = '<figure class="op-interactive"><iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fsunnyhundalorg%2Fvideos%2F'+ id +'%2F&amp;show_text=0" height="400" width="480" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen=""></iframe></figure>';
                } else {
                    let id = news.MainVideo.url.split('/').pop();
                    iframe = '<figure class="op-interactive"><iframe width="560" height="315" allowfullscreen frameborder="0" src="https://www.youtube.com/embed/'+ id +'"></iframe></figure>';
                }
                news.content = news.content + iframe;
            }

            items.push({
                title: news.title,
                link: 'https://www.nownews.com' + news.parseUrl,
                guid: news._id,
                date: utils.dateFormat(news.startedAt, 'YYYY/MM/DD HH:mm:ss'),
                isoDate: utils.dateFormat(news.startedAt),
                author: news.newsBy,
                description: news.summary,
                imgUrl: news.MainPhoto.url || '',
                imgTitle: news.MainPhoto.desc || news.title,
                body: news.content,
                cate: news.MainMenu.name,
                newsId: news.sn,
                menuId: news.MainMenu._id,
                parseUrl: news.parseUrl,
                photos: news.Photos
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
