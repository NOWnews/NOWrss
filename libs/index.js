
const hashPwd = require('./hashPwd');
const dateFormat = require('./dateFormat');
const getNeedNewsFromMongo = require('./getNeedNewsFromMongo');
const buildRssFromNews = require('./buildRssFromNews');
const getAllMainCategory = require('./getAllMainCategory');
const rssFacebookInstantArticleTp = require('./rssFacebookInstantArticleTp');

module.exports = {
    hashPwd: hashPwd,
    dateFormat: dateFormat,
    getNeedNewsFromMongo: getNeedNewsFromMongo,
    buildRssFromNews: buildRssFromNews,
    getAllMainCategory: getAllMainCategory,
    rssFacebookInstantArticleTp: rssFacebookInstantArticleTp
};
