const debug = require('debug')('NOWrss:libs:checkBodyImageIsAuth');
const co = require('co');
const Promise = require('bluebird');
const cheerio = require('cheerio');

module.exports = co.wrap(function*(news) {

    let $ = cheerio.load(news.body.value, {
        decodeEntities: false
    });

    // 這一段專門在處理不能外送的新聞內文圖片
    $('img').filter(function(i, el) {

        $(this).remove();

        // TODO: 找出不能外送的圖片 class name 並刪除
        // let classString = $(this).attr('class');
        // let regexpString = /media__[0-9]+__isAuth__0/;
        // let result = classString.match(regexpString);
        // if(result !== null) {
        //     $('.' + classString).remove();
        // }
    });

    // 把圖說拿掉因為他真的很討厭幹你娘勒
    $('cite').filter(function(i, el) {
        $(el).parents().remove();
    });

    news.body.value = $.html();
    return yield Promise.resolve(news);
});
