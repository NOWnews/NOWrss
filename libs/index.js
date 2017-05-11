
const hashPwd = require('./hashPwd');
const dateFormat = require('./dateFormat');
const checkDateRange = require('./checkDateRange');
const getNeedNewsFromApi = require('./getNeedNewsFromApi');
const buildRssFromNews = require('./buildRssFromNews');
const getAllMainCategory = require('./getAllMainCategory');
const rssFacebookInstantArticleTp = require('./rssFacebookInstantArticleTp');

module.exports = {
    hashPwd: hashPwd,
    dateFormat: dateFormat,
    checkDateRange: checkDateRange,
    getNeedNewsFromApi: getNeedNewsFromApi,
    buildRssFromNews: buildRssFromNews,
    getAllMainCategory: getAllMainCategory,
    rssFacebookInstantArticleTp: rssFacebookInstantArticleTp
};
