
const co = require('co');
const Promise = require('bluebird');
const mongodb = require('mongodb');

const config = require('../config');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const mongodb14 = MongoClient.connectAsync(config.newsMongodb);

module.exports = mongodb14;