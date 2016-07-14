
const co = require('co');
const is = require('is_js');

const debug = require('debug')('NOWrss:redis:getRssIdByRedis');
const client = require('./client');
const getValue = require('./getValue');
const setValue = require('./setValue');
const getNewsByTids = require('../libs/getNewsByTids');

/*
 * 撈取新聞 Mongo 裡面的 Menu
 */
module.exports = co.wrap(function*(mainTids, startEpoch, endEpoch, channelId) {
    let channelIdString = channelId.toString();
    let allNewsRedis = yield getValue(channelIdString);

    // debug('allNewsRedis = %j', allNewsRedis);

    if(is.array(allNewsRedis) && allNewsRedis.length !== 0) {
        // debug('redis allNews data = %j', allNewsRedis);
        return yield Promise.resolve(allNewsRedis);
    }

    let allNews = yield getNewsByTids(mainTids, startEpoch, endEpoch);

    // debug('allNews From Api = %j', allNews);

    let updateRedisAllNews = yield setValue(channelIdString, allNews, 360);

    return yield Promise.resolve(updateRedisAllNews);
});
