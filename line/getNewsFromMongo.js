
const debug = require('debug')('NOWrss:line:getNewsFromMongo');
const co = require('co');
const Promise = require('bluebird');

const MongoDB = Promise.promisifyAll(require('mongodb'));
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*(start, end) {

    if(!start) {
        return Promise.reject(new Error('要帶入 start 的 epoch 時間'));
    }

    if(!end) {
        return Promise.reject(new Error('要帶入 end 的 epoch 時間'));
    }

    let db = yield MongoClient.connectAsync('mongodb://nowproduction:werocks@mongodb16.nownews.com.tw,mongodb15.nownews.com.tw,mongodb14.nownews.com.tw,mongodb18.nownews.com.tw/production');

    let news = yield db.collection('fields_current.node').find({
            _bundle: 'news',
            _type: 'node',
            'field_source.target_id': 639,
            'field_auth.value': 1,
            'field_adult.value': 0,
            'field_release_date.value': {
                '$gte': start,
                '$lte': end
            },
        })
        .toArray();

    return Promise.resolve(news);
});