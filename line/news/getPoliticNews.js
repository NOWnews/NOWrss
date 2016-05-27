/*
 * 取得政治新聞
 */

const debug = require('debug')('NOWrss:line:news:getPoliticNews');
const co = require('co');
const Promise = require('bluebird');
const MongoDB = Promise.promisifyAll(require('mongodb'));
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const getTidsByName = require('./getTidsByName');
const categoryName = '政治';

module.exports = co.wrap(function*(start, end) {

    // 轉換成 epoch time
    let startEpoch = Math.floor(start / 1000);
    let endEpoch = Math.floor(end / 1000);

    let db = yield MongoClient.connectAsync('mongodb://nowproduction:werocks@mongodb16.nownews.com.tw,mongodb15.nownews.com.tw,mongodb14.nownews.com.tw,mongodb18.nownews.com.tw/production');

    // 用 name 去取得所有 tids
    let tids = yield getTidsByName(categoryName);
    debug('tids = %j', tids);

    let relations = yield db.collection('fields_current.relation').find({
            'field_release_status': 1,
            // $and: [
            //     {
            //         'endpoints.entity_type': 'taxonomy_term'
            //     },
            //     {
            //         'endpoints.entity_id': {
            //             $in: tids
            //         }
            //     }
            // ],
            // 'endpoints.entity_type': 'taxonomy_term',
            // 'endpoints.entity_id': {
            //     $in: tids
            // },
            $and: [
                { 
                    'field_release_date.value': { 
                        $gte: startEpoch
                    } 
                },
                { 
                    'field_release_date.value': {
                        $lte: endEpoch 
                    } 
                },
                {
                    'endpoints.entity_type': 'taxonomy_term'
                },
                {
                    'endpoints.entity_id': {
                        $in: tids
                    }
                }
            ]
        }, {
            _id: true,
            endpoints: true
        })
        .sort({_id: -1})
        .toArray();

        debug('relations = %j', relations);

        return Promise.reslove({});
});