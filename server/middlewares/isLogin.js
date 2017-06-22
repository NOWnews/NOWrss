
const debug = require('debug')('NOWrss:admin:middlewares:isLogin');

module.exports = (req, res, next) => {

	if(!req.session || !req.session.user) {
        return res.redirect('/admin/auth/login');
    }

    res.locals.user = req.session.user;

    return next();
};
