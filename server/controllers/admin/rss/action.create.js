
const debug = require('debug')('NOWrss:controllers:admin:rss:action.create');
const models = require('../../../../models');
const libs = require('../../../../libs');

const co = require('co');

module.exports = (req, res, next) => {

    let data = req.body;
    debug('req.body = %j', data);

    if(data.password !== data.confirm) {
        return next(new Error('輸入密碼不一致'));
    }
    co(function*() {

        let newAdminUser = yield models.user.createAsync({
            name: data.name,
            email: data.email,
            password: libs.hashPwd(data.password),
            createdBy: data.createdBy || '500000000000000000000001'
        });
        debug('newAdminUser = %j', newAdminUser);

        return res.send('create');

        // return res.redirect('/adminUser/');
    })
    .catch(next);
};
