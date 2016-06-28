
import co from 'co';
import Promise from 'bluebird';

const debug = require('debug')('NOWvote:redis:setValue');
const client = require('./client');
const config = require('../config');


/*
 * 利用 key 與 value 將資料存入 redis，並設定過期時間
 */
module.exports = co.wrap(function*(key, value, expire) {

    let valueString = JSON.stringify(value);
    client.set(key, valueString);

    if(expire) {
        client.expire(key, expireTime);
    }

    let cacheValue = yield client.getAsync(key);
    let valueObject = JSON.parse(cacheValue);
    return yield Promise.resolve(valueObject);
});