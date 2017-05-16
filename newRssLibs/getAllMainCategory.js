
const debug = require('debug')('NOWrss:newRssLibs:getAllMainCategory');
const _ = require('lodash');

module.exports = async ()=> {

    let { data : menus }  = await axios.get('/menus');
    let mainCategory = [];
    
    _.forEach(menus, (menu) => {
        console.log('menus',menu);
        mainCategory.push({"name":menu.name})
    });
    
    // debug('main category %j ' , mainCategory);
    


    return mainCategory;
};
