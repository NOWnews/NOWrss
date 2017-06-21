
module.exports = {
    client: require('./client'),
    setValue: require('./setValue'),
    getValue: require('./getValue'),
    // 取得主要的新聞分類
    getMongoCategories: require('./getMongoCategories'),
    getApiCategories: require('./getApiCategories'),
    // 用 id 取得已存入的 Rss 資訊
    getRssIdByRedis: require('./getRssIdByRedis'),
};
