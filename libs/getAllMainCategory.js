
const debug = require('debug')('NOWrss:libs:getAllMainCategory');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = async ()=> {

    let { data : menus }  = await axios.get('/menus');
    let mainCategory = [];
    
    _.forEach(menus, (menu) => {
        mainCategory.push({"name":menu.name})
    });
    
    debug('main category %j ' , mainCategory);
    


    return await Promise.resolve(mainCategory);
};
