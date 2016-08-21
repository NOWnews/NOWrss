import co from 'co';
import Promise from 'bluebird';
import mongodb from 'mongodb';

import config from '../config';

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

let mongodb14 = MongoClient.connectAsync(config.newsMongodb);

module.exports = mongodb14;