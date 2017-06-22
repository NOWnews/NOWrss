import rssFacebookGet from './rssFacebookGet';
import admin from './admin';
import rssGet from './rssGet';

module.exports = (app) => {

    app.use('/', rssGet);
    app.use('/', rssFacebookGet);
    app.use('/', admin);

    return (req, res, next) => next();
};
