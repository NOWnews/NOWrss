require('../global.js');

let fs = require('fs');
let app = require('../server');
let http = require('http');
let https = require('https');
let port = process.env.PORT || '9453';
let httpsPort = process.env.PORT || '9454';

var httpsOptions = {
    key: fs.readFileSync('./pems/server.key'),
    cert: fs.readFileSync('./pems/server.pem')
};

let server = http.createServer(app);
let httpsServer = https.createServer(httpsOptions, app);

server.listen(port);
httpsServer.listen(httpsPort);
console.log(`Start Listen Port ${port} and ${NODE_ENV} mode`);
console.log(`https Start Listen Port ${httpsPort} and ${NODE_ENV} mode`);
