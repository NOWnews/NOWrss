
const debug = require('debug')('NOWrss:admin:middlewares:defaultUser');
import { User } from '../models';
import { hashPwd } from '../utils';
import Promise from 'bluebird';

const defaultName = 'DEVELOP';
const defaultEmail = 'admin@nownews.com';
const defaultPassword = 'admin@nownews.com';

module.exports = () => {

    let adminUser = async () => {
        try {
            let adminUser;

            adminUser = await models.user.findOne()
                .where('email').equals(defaultEmail)
                .where('password').equals(utils.hashPwd(defaultPassword))
                .where('name').equals(defaultName)
                .where('trashed').equals(false)
                .execAsync();

            if(!adminUser){
                adminUser = await models.user.createAsync({
                    _id: '500000000000000000000001',
                    email: defaultEmail,
                    password: utils.hashPwd(defaultPassword),
                    name: defaultName,
                    createdBy: '500000000000000000000001'
                });
            }

            return Promise.resolve(adminUser);
        } catch(err) {
            return Promise.reject(err);
        }
    };

    return (req, res, next) => {
        return next();
    };
};
