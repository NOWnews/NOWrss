module.exports = {

    /*
     * mongoDB 資料
     */
    adminMongodb: process.env.NODE_ENV === 'production' ? 'mongodb://localhost:27017' : 'mongodb://localhost:27017',

    /*
     * redis 資料
     */
    redis: {
        host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
        port: 6379,
        db: 2,
        password: null,
        expireSeconds: 360
    },

    /*
     * api-admin server
     */
    apiServer: {
        host: process.env.NODE_ENV === 'production' ? 'https://devapi.nownews.com' : 'http://localhost:10000',
        headers: {
            "X-NOWnews-API": ["NOWnewsIsFeature"]
        }
    }

};
