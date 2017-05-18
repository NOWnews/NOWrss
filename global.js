var config = require('./config.js');
var axiosLib = require('axios');

global._ = require('lodash');

global.axios = axiosLib.create({
    baseURL: config.apiServer,
    timeout: 5000,
    headers: config.headers
});

global.NODE_ENV = process.env.NODE_ENV || 'staging';

global.rootPath = __dirname;
global.config = require('./config');
