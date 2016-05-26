
const debug = require('debug')('NOWrss:controllers:admin:user:page.list');
const models = require('../../../../models');
const libs = require('../../../../libs');

module.exports = (req, res, next) => {
    return res.render('admin/user/list');
};
