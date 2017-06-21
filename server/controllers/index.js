let admin = require('./admin');
let v2RssGet = require('./v2RssGet');
let v2RssFacebookGet = require('./v2RssFacebookGet');

module.exports = (app) => {

    app.use('/', admin);
    app.use('/', v2RssGet);
    app.use('/', v2RssFacebookGet);
    app.use('/v2', v2RssGet);
    app.use('/v2', v2RssFacebookGet);

    return (req, res, next) => next();
};
