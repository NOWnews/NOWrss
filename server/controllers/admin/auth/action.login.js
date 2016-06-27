const Promise = require('bluebird');
const co = require('co');

const debug = require('debug')('NOWrss:controllers:admin:action.login');

const models = require('../../../../models');
const libs = require('../../../../libs');

module.exports = function(req, res, next) {

    let data = req.body;
    debug('req.body = %j', data);

    co(function*() {

        let loginUser = yield models.user.findOne()
            .where('email').equals(data.email)
            .where('password').equals(libs.hashPwd(data.password))
            .execAsync();

        if(!loginUser){
            return Promise.reject(new Error('找不到 ADMIN USER'));
        }

        debug('login user= %j', loginUser);

        req.session.user = loginUser;

        return res.redirect('/admin');
    })
    .catch(next);
};
