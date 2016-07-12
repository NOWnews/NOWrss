let admin = require('./admin');
let rssGet = require('./rssGet');

module.exports = (app) => {

    app.use('/', admin);
    app.use('/', rssGet);

    return (req, res, next) => next();
};
