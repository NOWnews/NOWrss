
const debug = require('debug')('NOWrss:controllers:admin:user:action.update');
const models = require('../../../models');
const libs = require('../../../libs');

const co = require('co');

module.exports = (req, res, next) => {
    const updateFields = ['name'];
    let data = _.pick(req.body, updateFields);
    let sn = req.params.sn;

    co(function*() {

        let updatedUser = req.session.user;
        let user = yield models.user.findBySn(sn);

        updateFields.forEach(function(field) {
            user.set(field, data[field]);
        });

        if(updatedUser) {
            user.set('updatedBy', updatedUser._id);
        }

        let updatedAdminUser = yield user.saveAsync();

        return res.redirect(`/admin/user`);
    })
    .catch(next);

};
