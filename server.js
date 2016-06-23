let express = require('express');

let app = express();

// middlewares
let middlewares = require('./server/middlewares');
app.use(middlewares(app));

// controllers
let controllers = require('./server/controllers');
app.use(controllers(app));

// errorHandles
let errorHandles = require('./server/errorHandles');
app.use(errorHandles(app));

module.exports = app;
