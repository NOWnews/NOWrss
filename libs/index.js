
const getNeedNewsFromMongo = require('./getNeedNewsFromMongo');
const buildRssFromNews = require('./buildRssFromNews');
const getAllMainCategory = require('./getAllMainCategory');
const rssFacebookInstantArticleTp = require('./rssFacebookInstantArticleTp');

module.exports = {
    getNeedNewsFromMongo: getNeedNewsFromMongo,
    buildRssFromNews: buildRssFromNews,
    getAllMainCategory: getAllMainCategory,
    rssFacebookInstantArticleTp: rssFacebookInstantArticleTp
};
