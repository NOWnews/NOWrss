
const hashPwd = require('./hashPwd');
const dateFormat = require('./dateFormat');
const checkDateRange = require('./checkDateRange');
const getNeedNewsFromApi = require('./getNeedNewsFromApi');
const buildRssFromNews = require('./buildRssFromNews');
const rssFacebookInstantArticleTp = require('./rssFacebookInstantArticleTp');

module.exports = {
    hashPwd: hashPwd,
    dateFormat: dateFormat,
    checkDateRange: checkDateRange,
    getNeedNewsFromApi: getNeedNewsFromApi,
    buildRssFromNews: buildRssFromNews,
    rssFacebookInstantArticleTp: rssFacebookInstantArticleTp
};
