
const rssTemplate = require('./rssTemplate');
const hashPwd = require('./hashPwd');
const dateFormat = require('./dateFormat');
const getNeedNewsFromMongo = require('./getNeedNewsFromMongo');

module.exports = {
    hashPwd: hashPwd,
    dateFormat: dateFormat,
    rssTemplate: rssTemplate,
    getNeedNewsFromMongo: getNeedNewsFromMongo,

    getAllMainCategory: getAllMainCategory,
    getNewsByTids: getNewsByTids,
    getNewsImageFromNodeId: getNewsImageFromNodeId,
    checkBodyImageIsAuth: checkBodyImageIsAuth,
    getRefNews: getRefNews
};
