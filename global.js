let config = require('./config.js');
let axiosLib = require('axios');

global._ = require('lodash');

global.axios = axiosLib.create({
    baseURL: config.apiServer.host,
    timeout: 5000,
    headers: config.apiServer.headers
});

global.NODE_ENV = process.env.NODE_ENV || 'staging';

global.rootPath = __dirname;
global.config = require('./config');
