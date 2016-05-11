
require('babel-core/register');
require('babel-polyfill');
require('../global.js');

const app = require('../app');
const http = require('http');

const port = process.env.PORT || '5493';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log(`Start Listen Port ${port} and ${NODE_ENV} mode`);
