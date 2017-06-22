

const debug = require('debug')('NOWrss:libs:getApiCategories');

import is from 'is_js';
import { getValue, setValue } from '../redis';

/*
 * 撈取新聞 Mongo 裡面的 Menu
 */
module.exports = async (key, value, expire) => {

    try {

        let mainCategoriesRedis = await getValue('mainCategoriesRedis');

        debug('mainCategoriesRedis = %j', mainCategoriesRedis);

        if(is.array(mainCategoriesRedis) && mainCategoriesRedis.length !== 0) {
            debug('redis mainCategories data = %j', mainCategoriesRedis);
            return await Promise.resolve(mainCategoriesRedis);
        }

        // 如果 Redis 裡面沒有資料就去 API 撈
        let { data : menus }  = await axios.get('/menus');

        let mainCategories = _.map(menus, (menu) => {
            let name = menu.name;
            return { name };
        });

        debug('mainCategories From Api = %j', mainCategories);

        let updateRedisMainCategories = await setValue('mainCategoriesRedis', mainCategories, 600);

        return Promise.resolve(updateRedisMainCategories);
    } catch(err) {
        return Promise.reject(err);
    }
};
