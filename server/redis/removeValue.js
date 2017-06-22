
const debug = require('debug')('NOWnews-api:redis:removeValue');

import Promise from 'bluebird';
import client from './client';

module.exports = async (key) => {
    try {

        let value = await client.getAsync(key);
        debug('value = %s', value);

        if(!value) {
            return Promise.resolve(true);
        }

        await client.delAsync(key);

        return Promise.resolve(true);
    } catch (err) {
        return Promise.reject(err);
    }
};