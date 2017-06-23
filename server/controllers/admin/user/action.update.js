
const debug = require('debug')('NOWrss:controllers:admin:user:action.update');

import { User } from '../../../models';
import libs from '../../../libs';

module.exports = async (req, res, next) => {
    const updateFields = ['name'];
    let data = _.pick(req.body, updateFields);
    let sn = req.params.sn;

    try {
        let updatedUser = req.session.user;
        let user = await User.findBySn(sn);

        updateFields.forEach(function(field) {
            user.set(field, data[field]);
        });

        if(updatedUser) {
            user.set('updatedBy', updatedUser._id);
        }

        let updatedAdminUser = await user.saveAsync();

        return res.redirect(`/admin/user`);
    } catch(err) {
        return next(err);
    }
};
