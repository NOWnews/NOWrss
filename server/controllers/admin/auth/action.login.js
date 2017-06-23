
const debug = require('debug')('NOWrss:controllers:admin:action.login');

import Promise from 'bluebird';
import { User } from '../../../models';
import utils from '../../../utils';

module.exports = async (req, res, next) => {

    let data = req.body;
    debug('req.body = %j', data);

    try {
        let loginUser = await User.findOne()
            .where('email').equals(data.email)
            .where('password').equals(utils.hashPwd(data.password))
            .execAsync();

        if(!loginUser){
            return next(new Error('找不到 ADMIN USER'));
        }

        debug('login user= %j', loginUser);
        req.session.user = loginUser;

        return res.redirect('/admin');

    } catch(err) {
        next(err)
    }
};
