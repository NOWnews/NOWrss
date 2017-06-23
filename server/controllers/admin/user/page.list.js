
const debug = require('debug')('NOWrss:controllers:admin:user:page.list');

import { User } from '../../../models';
import libs from '../../../libs';

module.exports = async (req, res, next) => {

	try {
		let users = await User.find()
            .where('trashed').equals(false)
            .execAsync();

        return res.render('admin/user/list', {
            users
        });
	} catch(err) {
		return next(err);
	}
};
