
const debug = require('debug')('NOWrss:libs:getNewsByTids');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
// const config = require('../config');

// const MongoDB = Promise.promisifyAll(require('mongodb'));
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const getNewsImageFromNodeId = require('./getNewsImageFromNodeId');

module.exports = co.wrap(function*(tids, start, end) {

    let mongodb14 = yield require('../mongodb14');
    // let db = yield MongoClient.connectAsync(config.newsMongodb);

    // debug('tids = %j', tids);
    debug('start = %d', start);
    debug('end = %d', end);

    // 找出所有最大分類的 tid
    let news = yield mongodb14.collection('fields_current.node').find({
           _bundle: 'news',
           _type: 'node',
           'field_auth.value': '1', // 是否可以外送
           'field_release_status.value': 1,  // 發佈狀態
           'field_main_category.tid': {
                $in: tids
           },
           $and: [
               {
                   'field_release_date.value': {
                       $gte: start
                   }
               },
               {
                   'field_release_date.value': {
                       $lte: end
                   }
               }
           ]
        }, {
            _id: true,
            title: true,
            field_main_category: true,
            field_release_date: true,
            body: true,
            field_short_title: true,
            field_free_body: true,
            field_news_ref: true,
            field_newsby: true
        }).sort({'field_release_date.value': -1}).limit(60).toArray();

    let setNewsPhotoByNews = yield Promise.map(news, function(n) {
        return getNewsImageFromNodeId(n);
    })
    .then(function(checkedNews) {
        return Promise.resolve(checkedNews);
    });

    // yield db.closeAsync();
    // debug('news = %j', news);
    // debug('setNewsPhotoByNews = %j', setNewsPhotoByNews);
    // debug('setNewsPhotoByNews total = %d', setNewsPhotoByNews.length);

    return yield Promise.resolve(setNewsPhotoByNews);
});
