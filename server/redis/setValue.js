
const debug = require('debug')('NOWrss:redis:setValue');

import Promise from 'bluebird';
import client from './client';

/*
 * 利用 key 與 value 將資料存入 redis，並設定過期時間
 */
module.exports = async (key, value, expire) => {
    try {

        let valueString = JSON.stringify(value);
        await client.setAsync(key, valueString);

        if(expire) {
            await client.expireAsync(key, expire);
        }

        return Promise.resolve(value);
    } catch (err) {
        return Promise.reject(err);
    }
};
