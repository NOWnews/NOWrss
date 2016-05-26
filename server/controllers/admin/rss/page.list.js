
const debug = require('debug')('NOWrss:controllers:admin:rss:page.list');
const models = require('../../../../models');
const libs = require('../../../../libs');

module.exports = (req, res, next) => {
    return res.render('admin/rss/list');
};
