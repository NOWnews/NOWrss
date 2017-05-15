let admin = require('./admin');
let rssGet = require('./rssGet');
let rssFacebookGet = require('./rssFacebookGet');
let newRssGet = require('./newRssGet');
let newRssFacebookGet = require('./newRssFacebookGet');

module.exports = (app) => {

    app.use('/', admin);
    app.use('/', rssGet);
    app.use('/', rssFacebookGet);
    app.use('/', newRssGet);
    app.use('/', newRssFacebookGet);

    return (req, res, next) => next();
};
