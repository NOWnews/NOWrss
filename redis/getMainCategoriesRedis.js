
const co = require('co');
const is = require('is_js');
const fetch = require('node-fetch');

const debug = require('debug')('NOWrss:redis:getMainCategoriesRedis');
const client = require('./client');
const getRedisValue = require('./getValue');
const setRedisValue = require('./setValue');
const libs = require('../libs');

/*
 * 撈取新聞 Mongo 裡面的 Menu
 */
module.exports = co.wrap(function*() {

    let mainCategoriesRedis = yield getRedisValue('mainCategoriesRedis');

    // debug('mainCategoriesRedis = %j', mainCategoriesRedis);

    if(is.array(mainCategoriesRedis) && mainCategoriesRedis.length !== 0) {
        // debug('redis mainCategories data = %j', mainCategoriesRedis);
        return yield Promise.resolve(mainCategoriesRedis);
    }

    let mainCategories = yield libs.getAllMainCategory();

    // debug('mainCategories From Api = %j', mainCategories);

    let updateRedisMainCategories = yield setRedisValue('mainCategoriesRedis', mainCategories, 360);

    return yield Promise.resolve(updateRedisMainCategories);
});
