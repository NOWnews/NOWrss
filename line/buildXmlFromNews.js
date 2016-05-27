
const debug = require('debug')('NOWrss:line:buildXmlFromNews');
const co = require('co');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
const _ = require('lodash');

module.exports = co.wrap(function*(newsArray) {

    let time = Math.floor(moment(Date.now()));

    let jsonData = {
        UUID: uuid.v4(),
        time: time
    };

    jsonData.article = _.map(newsArray, function(news) {
        return {
            ID: news._id,
            nativeCountry: 'TW',
            language: 'zh',
            publishCountries: {
                country: [
                    'TW'
                ]
            },
            excludedCountries: {
                country: [
                    'CN'
                ]
            },
            title: news.title,

        };
    });

    return jsonData;
});