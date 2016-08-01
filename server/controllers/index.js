let admin = require('./admin');
let rssGet = require('./rssGet');
let rssFacebookGet = require('./rssFacebookGet');

module.exports = (app) => {

    app.use('/', admin);
    app.use('/', rssGet);
    app.use('/', rssFacebookGet);

    return (req, res, next) => next();
};
