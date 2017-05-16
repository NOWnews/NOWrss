const debug = require('debug')('NOWrss:newRssLibs:newsToOldFormat');
const _ = require('lodash');

module.exports = async(allNews) => {

    return _.map(allNews,(news, i) => {
        //主分類+所有子分類都放進categories
        let categories = (news.Menus.map(menu => menu['name']));
        categories.unshift(news.MainMenu.name);

        return {
            "_id": news.sn,
            "title": news.title,
            "body": {
                "summary": news.summary,
                "value": news.content,
                "format": "full_html"
            },
            "field_free_body": {
                "value": "",
                "format": "free_style"
            },
            "field_news_ref": [],
            "field_newsby": {
                "value": news.newsby
            },
            "field_release_date": {
                "value": (new Date(news.createdAt).getTime()) / 1000
            },
            "field_short_title": {
                "value": news.shortTitle
            },
            "field_main_category": {
                "tid": ""
            },
            "image": {
                "title": news.MainPhoto ? news.MainPhoto.title : "",
                "description": news.MainPhoto ? news.MainPhoto.desc : "",
                "uri": news.MainPhoto ? news.MainPhoto.url : "",
                "url": news.MainPhoto ? news.MainPhoto.url : "",
                "originalUrl": news.MainPhoto ? news.MainPhoto.url : "",
                "body": news.MainPhoto ? `<div class="main-photo"><img src="${news.MainPhoto.url}" width="320px;" class="editorial"><cite>${news.MainPhoto.title}</cite></div>`: ""
            },
            "category": categories
        }

    });

}
