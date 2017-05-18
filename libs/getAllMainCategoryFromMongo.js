
const debug = require('debug')('NOWrss:libs:getAllMainCategory');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
// const config = require('../config');

// const MongoDB = Promise.promisifyAll(require('mongodb'));
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

module.exports = async ()=> {

    let mongodb14 = await require('../mongodb14');
    // let db = yield MongoClient.connectAsync(config.newsMongodb);

     let test  = await axios.get('/menus');
    debug('main menu %j',test.data)

    // 找出所有最大分類的 tid
    let mainCategory = await mongodb14.collection('fields_current.taxonomy_term').find({
           _bundle: 'main_category',
           vid: 14
        }, {
            _id: true,
            name: true,
            tid: true
        }).toArray();

    debug('mainCategory = %j', mainCategory);

    // yield db.closeAsync();

    return await Promise.resolve(mainCategory);
};
