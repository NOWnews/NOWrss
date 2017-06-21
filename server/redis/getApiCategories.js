
const is = require('is_js');

const debug = require('debug')('NOWrss:redis:getApiCategories');
const client = require('./client');
const getRedisValue = require('./getValue');
const setRedisValue = require('./setValue');

/*
 * 撈取新聞 Mongo 裡面的 Menu
 */
module.exports = async() => {
    try {

        let mainCategoriesRedis = await getRedisValue('v2MainCategoriesRedis');

        // debug('mainCategoriesRedis = %j', mainCategoriesRedis);

        if(is.array(mainCategoriesRedis) && mainCategoriesRedis.length !== 0) {
            // debug('redis mainCategories data = %j', mainCategoriesRedis);
            return await Promise.resolve(mainCategoriesRedis);
        }

        // 如果 Redis 裡面沒有資料就去 API 撈
        let { data : menus }  = await axios.get('/menus');
        let mainCategories = [];
        _.forEach(menus, (menu) => {
            if (!menu.level) {
                mainCategories[menu.weight] = { 'name': menu.name };
            }
        });

        // let mainCategories = menus;

        debug('mainCategories From Api = %j', mainCategories);

        let updateRedisMainCategories = await setRedisValue('v2MainCategoriesRedis', mainCategories, 360);

        return updateRedisMainCategories;
    } catch(err) {
        return next(err);
    }
};
