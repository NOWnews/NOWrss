
const debug = require('debug')('NOWrss:controllers:admin:user:action.create');
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

        let newUser = yield models.user.createAsync({
            name: data.name,
            email: data.email,
            password: libs.hashPwd(data.password),
            createdBy: data.createdBy || '500000000000000000000001'
        });
        debug('newUser = %j', newUser);

        return res.send('create');
    })
    .catch(next);
};
