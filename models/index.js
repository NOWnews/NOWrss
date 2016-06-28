let Promise = require('bluebird');
let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

/*
 * 利用 bluebird 將 mongoose 轉換成可以使用 promise
 */
Promise.promisifyAll(mongoose);

// const dbUrl = `${config.mongodb}/rss_${NODE_ENV}`;
const dbUrl = `${config.adminMongodb}/rss_${NODE_ENV}`;
mongoose.connect(dbUrl);
const connection = mongoose.connection;

autoIncrement.initialize(connection);

/*
 * 因為用 let 會在程式啟動前，就把所有的 code 先做一次，所以這邊只能用 require，要不然 autoIncrement 會出錯
 */
const user = require('./user');
const rss = require('./rss');

module.exports = {
    user: user,
    rss: rss
};
