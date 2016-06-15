
const debug = require('debug')('NOWrss:line:getAllMainCategory');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
const config = require('../config');

const MongoDB = Promise.promisifyAll(require('mongodb'));
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = co.wrap(function*() {

    let db = yield MongoClient.connectAsync(config.mongodb);

    // 找出所有最大分類的 tid
    let mainCategory = yield db.collection('fields_current.taxonomy_term').find({
           _bundle: 'main_category',
           vid: 14
        }, {
            _id: true,
            name: true,
            tid: true
        }).toArray();

    // debug('mainCategory = %j', mainCategory);

    return yield Promise.resolve(mainCategory);
});