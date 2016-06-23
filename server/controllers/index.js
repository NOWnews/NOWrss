let demo = require('./test');
let qoo = require('./qoo');
let admin = require('./admin');
let rssGet = require('./rssGet');

module.exports = (app) => {

    app.use('/', admin);

    app.use('/test', demo);
    app.use('/qoo', qoo);
    app.use('/rss', rssGet);

    return (req, res, next) => next();
};
