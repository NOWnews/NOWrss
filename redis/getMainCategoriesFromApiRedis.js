
const co = require('co');
const is = require('is_js');

const debug = require('debug')('NOWrss:redis:getMainCategoriesRedis');
const client = require('./client');
const getRedisValue = require('./getValue');
const setRedisValue = require('./setValue');
const getAllMainCategory = require('./../newRssLibs/getAllMainCategory');

/*
 * 撈取新聞 Mongo 裡面的 Menu
 */
module.exports = async()=> {

    let mainCategoriesRedis = await getRedisValue('mainCategoriesRedis');

    // debug('mainCategoriesRedis = %j', mainCategoriesRedis);

    if(is.array(mainCategoriesRedis) && mainCategoriesRedis.length !== 0) {
        // debug('redis mainCategories data = %j', mainCategoriesRedis);
        return await Promise.resolve(mainCategoriesRedis);
    }

    let mainCategories = await getAllMainCategory();

    // debug('mainCategories From Api = %j', mainCategories);

    let updateRedisMainCategories = await setRedisValue('mainCategoriesRedis', mainCategories, 360);

    return updateRedisMainCategories;
};
