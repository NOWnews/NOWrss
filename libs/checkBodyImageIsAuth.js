const debug = require('debug')('NOWrss:lib:checkBodyImageIsAuth');
const co = require('co');
const Promise = require('bluebird');
const cheerio = require('cheerio');

module.exports = co.wrap(function*(news) {

    let $ = cheerio.load(news.body.value, {
        decodeEntities: false
    });

    // 這一段專門在處理不能外送的新聞內文圖片
    $('img').filter(function(i, el) {

        // 台哥大說要把 br 拿掉...
        $(el).parent().find('br').remove();

        // $(this).remove();

        // TODO: 找出不能外送的圖片 class name 並刪除
        let classString = $(this).attr('class');
        let regexpString = /media__[0-9]+__isAuth__0/;
        let result = classString.match(regexpString);

        console.log('newsId = ' + news._id);
        // console.log('Class String = ' + classString);
        // console.log('regexpString = ' + regexpString);
        // console.log('result = ' + result);
        console.log('不刪除: ' + result);
        if(result !== null) {
            console.log('刪除: ' + result);
            $(el).parent().remove();
            // $('.' + classString).remove();
        }
        console.log('---------------- 觀察用 ----------------');
        // console.log($(el).parent().find('cite'));
        // $(el).parent().find('cite').remove();
        // $(el).parent().find('em').remove();
        // $(el).parent().find('br').remove();
    });

    // 把圖說拿掉因為他真的很討厭幹你娘勒
    // $('cite').filter(function(i, el) {
    //     $(el).remove();
    //     // $(el).parents().remove();
    // });

    let bodyHtml = $.html().replace(/"foaf:Image"/gi, '"foaf:Image"/').replace(/<br>/gi, '<br/>');
    news.body.value = bodyHtml;
    return yield Promise.resolve(news);
});
