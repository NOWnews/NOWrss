/*
 * 這邊只會處理到選單第二層
 */

const debug = require('debug')('NOWrss:line:news:getTidsByName');
const co = require('co');
const Promise = require('bluebird');
const fetch = require('node-fetch');
const _ = require('lodash');

module.exports = co.wrap(function*(name) {

    // 從 drupal 後台取得 menu 的 json 資料
    // let menuJsonData = yield fetch('http://e.nownews.com/api/v1/menu_type.json')
    // .then(function(res) {
    //     return res.json();
    // }).then(function(menuJson) {
    //     return Promise.resolve(menuJson);
    // });

    // // 利用傳入的名字找到最大分類的 key
    // let key = _.findKey(menuJsonData, function(data) {
    //     return data.name === name;
    // });
    // debug('key = %s', key);

    // if(!key) {
    //     return Promise.resolve({});
    // }

    // // 用 name 找出來的 menu 資料
    // let thisMenuData = menuJsonData[key];

    // // 將最大分類的 tid 存入 array
    // let allTids = [];
    // allTids.push(parseInt(thisMenuData.tid, 10));

    // // 將第二層分類的 tid 存入 array
    // _.forIn(thisMenuData.children, function(value ,childKey) {
    //     allTids.push(parseInt(value.tid, 10));
    // });
    // debug('allTids = %j', allTids);

    // return Promise.resolve(allTids);
});