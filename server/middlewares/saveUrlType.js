
const debug = require('debug')('NOWrss:admin:middlewares:saveUrlType');

module.exports = function(req, res, next) {

    let type = req.route.path.split('/')[2];

    debug('res.locals.route = %j', { type });

    res.locals.route = { type };

    return next();
};
