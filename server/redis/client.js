import Promise from 'bluebird';
import redis from 'redis';
import config from '../../config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let options = {
	host: config.redis.host,
	port: config.redis.port,
	db: config.redis.db,
	expireSeconds: config.redis.expireSeconds
};

if(config.redis.password !== null) {
    options.password = config.redis.password;
}

const client = redis.createClient(options);

module.exports = client;
