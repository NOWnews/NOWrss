
const debug = require('debug')('NOWrss:controllers:admin:user:action.create');

import { User } from '../../../models';
import utils from '../../../utils';

module.exports = async (req, res, next) => {

    let data = req.body;

    if(data.password !== data.confirm) {
        return next(new Error('輸入密碼不一致'));
    }

    try {
        let newUser = await User.createAsync({
            name: data.name,
            email: data.email,
            password: utils.hashPwd(data.password),
            createdBy: data.createdBy || '500000000000000000000001'
        });

        return res.redirect('/admin/user');
    } catch(err) {
        return next(err);
    }
};
