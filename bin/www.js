require('../global.js');

let colors = require('colors');
let app = require('../server');
let http = require('http');

let port = process.env.PORT || '9453';
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
console.log(`Start Listen Port ${port} and ${NODE_ENV} mode`);
