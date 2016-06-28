module.exports = {

    /*
     * 目前 NOWnews 主站的主要 database
     */
    newsMongodb: process.env.NODE_ENV === 'production' ? 'mongodb://nowproduction:werocks@192.168.10.181,192.168.10.182,192.168.10.183,192.168.10.184/production' : 'mongodb://nowproduction:werocks@mongodb16.nownews.com.tw,mongodb15.nownews.com.tw,mongodb14.nownews.com.tw,mongodb18.nownews.com.tw/production',

    /*
     * mongoDB 資料
     */
    adminMongodb: 'mongodb://localhost:27017',

    /*
     * redis 資料
     */
     redis: {
        host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
        expireSeconds: 3600
     },

};
