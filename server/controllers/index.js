let admin = require('./admin');
let rssGet = require('./rssGet');
let rssFacebookGet = require('./rssFacebookGet');
let v2RssGet = require('./v2RssGet');
let v2RssFacebookGet = require('./v2RssFacebookGet');

module.exports = (app) => {

    app.use('/', admin);
    app.use('/', rssGet);
    app.use('/', rssFacebookGet);
    app.use('/v2', v2RssGet);
    app.use('/v2', v2RssFacebookGet);

    return (req, res, next) => next();
};
