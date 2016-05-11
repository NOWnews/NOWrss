let express = require('express');

let app = express();

// middlewares
let middlewares = require('./api/middlewares');
app.use(middlewares(app));

// controllers
let controllers = require('./api/controllers');
app.use(controllers(app));

// errorHandles
let errorHandles = require('./api/errorHandles');
app.use(errorHandles(app));

module.exports = app;
