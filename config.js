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
        expireSeconds: 3600
    },

    /*
     * api-admin server
     */
    apiServer: {
        host: process.env.NODE_ENV === 'production' ? 'http://35.185.146.211:10000' : 'http://localhost:10000',
        headers: {
            "X-NOWnews-API": ["NOWnewsIsFeature"]
        }
    }

};
