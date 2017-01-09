
const hashPwd = require('./hashPwd');
const dateFormat = require('./dateFormat');
const checkDateRange = require('./checkDateRange');
const getNeedNewsFromMongo = require('./getNeedNewsFromMongo');
const buildRssFromNews = require('./buildRssFromNews');
const getAllMainCategory = require('./getAllMainCategory');
const rssFacebookInstantArticleTp = require('./rssFacebookInstantArticleTp');

module.exports = {
    hashPwd: hashPwd,
    dateFormat: dateFormat,
    checkDateRange: checkDateRange,
    getNeedNewsFromMongo: getNeedNewsFromMongo,
    buildRssFromNews: buildRssFromNews,
    getAllMainCategory: getAllMainCategory,
    rssFacebookInstantArticleTp: rssFacebookInstantArticleTp
};
