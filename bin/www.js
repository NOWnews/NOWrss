"use strict"

require('babel-core/register');

const app = require('../app');
const http = require('http');

let port = process.env.PORT || '5493';
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
console.log(`Start Listen Port ${port}`);
