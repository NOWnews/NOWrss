let demo = require('./test');
let qoo = require('./qoo');
let admin = require('./admin');
let rssGet = require('./rssGet');

module.exports = (app) => {

    app.use('/test', demo);
    app.use('/qoo', qoo);
    app.use('/admin', admin);
    app.use('/rss', rssGet);

    app.use('/', (req, res, next) => {
        res.send('<h1>Hello World!</h1>');
    });

    return (req, res, next) => next();
};
