
const debug = require('debug')('NOWrss:controllers:admin:page.login');

module.exports = (req, res, next) => {
    return res.render('admin/login');
};
