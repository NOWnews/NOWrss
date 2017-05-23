
const debug = require('debug')('NOWrss:admin:middlewares:saveUrlType');

module.exports = function(req, res, next) {

    debug('req.route.path = %s', req.route.path);

    let type = req.route.path.split('/')[2];

    debug('res.locals.route = %j', {type: type});

    res.locals.route = {type: type};

    return next();
};
