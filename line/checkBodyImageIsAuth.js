const debug = require('debug')('NOWrss:line:checkBodyImageIsAuth');
const co = require('co');
const Promise = require('bluebird');
const cheerio = require('cheerio');

module.exports = co.wrap(function*(news) {

    let $ = cheerio.load(news.body.value, {
        decodeEntities: false
    });

    // 這一段專門在處理不能外送的新聞內文圖片
    $('img').filter(function(i, el) {

        // 找出不能外送的 class name
        let classString = $(this).attr('class');
        let regexpString = /media__[0-9]+__isAuth__0/;
        let result = classString.match(regexpString);

        // // 將這個 class 的老爸們刪除
        // debug('result = %s', result);
        if(result !== null) {
            $('.' + classString).remove();
        }
    });

    // 把圖說拿掉因為他真的很討厭幹你娘勒
    $('cite').filter(function(i, el) {
        $(el).parents().remove();
    });

    news.body.value = $.html();
    return yield Promise.resolve(news);
});