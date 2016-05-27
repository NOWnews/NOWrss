
const debug = require('debug')('NOWrss:line:getNewsByTids');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');

const MongoDB = Promise.promisifyAll(require('mongodb'));
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*(tids, start, end) {

    let db = yield MongoClient.connectAsync('mongodb://nowproduction:werocks@mongodb16.nownews.com.tw,mongodb15.nownews.com.tw,mongodb14.nownews.com.tw,mongodb18.nownews.com.tw/production');

    debug('tids = %j', tids);
    debug('start = %d', start);
    debug('end = %d', end);

    // 找出所有最大分類的 tid
    let news = yield db.collection('fields_current.node').find({
           _bundle: 'news',
           _type: 'node',
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
            field_main_category: true
        }).toArray();

    debug('news = %j', news);
    debug('news total = %d', news.length);

    return yield Promise.resolve(news);
});