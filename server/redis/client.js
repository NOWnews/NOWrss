
const Promise = require('bluebird');
const redis = require('redis');

const config = require('../../config');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
    host: config.redis.host
});

module.exports = client;
