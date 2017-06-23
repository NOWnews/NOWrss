
const debug = require('debug')('NOWrss:controllers:admin:page.home');

module.exports = (req, res, next) => {
    return res.render('admin/home');
};
