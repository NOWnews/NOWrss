module.exports = {

    /*
     * 目前 NOWnews 主站的主要 database
     */
    // newsMongodb: process.env.NODE_ENV === 'production' ? 'mongodb://nowproduction:werocks@192.168.10.181,192.168.10.182,192.168.10.183,192.168.10.184/production' : 'mongodb://nowproduction:werocks@mongodb16.nownews.com.tw,mongodb15.nownews.com.tw,mongodb14.nownews.com.tw,mongodb18.nownews.com.tw/production',
    // newsMongodb: process.env.NODE_ENV === 'production' ? 'mongodb://nowproduction:werocks@192.168.10.181,192.168.10.182,192.168.10.183,192.168.10.184/production' : 'mongodb://nowproduction:werocks@mongodb14.nownews.com.tw/production',
    // newsMongodb: 'mongodb://nowproduction:werocks@192.168.10.182/production',
    newsMongodb: process.env.NODE_ENV === 'production' ? 'mongodb://nowproduction:werocks@mongodb-s14.nownews.com.tw/production' : 'mongodb://nowproduction:werocks@61.220.58.2/production',

    /*
     * mongoDB 資料
     */
    adminMongodb: process.env.NODE_ENV === 'production' ? 'mongodb://localhost:27017' : 'mongodb://localhost:27017',

    /*
     * redis 資料
     */
     redis: {
        host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
        expireSeconds: 3600
     },

     /*
     * api server
     */
     apiServer:process.env.NODE_ENV === 'production'?'http://localhost:10000':'http://localhost:10000'
     ,
     headers: {
        "X-NOWnews-API": ["NOWnewsIsFeature"]
    }

};
