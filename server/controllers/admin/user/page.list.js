
const debug = require('debug')('NOWrss:controllers:admin:user:page.list');
const models = require('../../../../models');
const libs = require('../../../../libs');

const co = require('co');

module.exports = (req, res, next) => {

    co(function*() {

        let users = yield models.user.find()
            .where('trashed').equals(false)
            .execAsync();

        return res.render('admin/user/list', {
            users
        });
    })
    .catch(next);
};
