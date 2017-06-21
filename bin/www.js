require('../global.js');
require('babel-core/register');
require('babel-polyfill');

const chalk = require('chalk');
const fs = require('fs');
const app = require('../server.js');
const http = require('http');
const https = require('https');
const port = process.env.PORT || '9453';
const httpsPort = process.env.PORT || '9454';

let httpsOptions = {
    key: fs.readFileSync('./pems/server.key'),
    cert: fs.readFileSync('./pems/server.pem')
};

const server = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

server.listen(port);
httpsServer.listen(httpsPort);

console.log(chalk.cyan(`-------------------------------`));
console.log(chalk.cyan(`Start NOWnews Web Rss`));
console.log(chalk.cyan(`Listen Http Port ${port}`));
console.log(chalk.cyan(`Listen Https Port ${port}`));
console.log(chalk.cyan(`${NODE_ENV} mode`));
console.log(chalk.cyan(`-------------------------------`));
