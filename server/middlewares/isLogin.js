
const co = require('co');

const debug = require('debug')('NOWrss:admin:middlewares:isLogin');

module.exports = function(req, res, next) {

    // debug('req.session.user = %j', req.session.user);

    if(!req.session || !req.session.user) {
        return res.redirect('/admin/auth/login');
    }

    res.locals.user = req.session.user;

    return next();
};
