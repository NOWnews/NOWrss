
const debug = require('debug')('NOWrss:controllers:admin:user:page.update');

import { User } from '../../../models';
import libs from '../../../libs';

module.exports = async (req, res, next) => {
    let sn = req.params.sn;

    try {
        let user = await User.findOne()
            .where('sn').equals(sn)
            .where('trashed').equals(false)
            .execAsync();

        let formData = {
            title: '更新管理者',
            action: `/admin/user/update/${sn}`,
            method: 'put',
            formColumn: [{
                title: '姓名',
                name: 'name',
                type: 'text',
                value: user.name
            },
            {
                title: 'E-mail',
                name: 'email',
                type: 'email',
                value: user.email,
                disabled: 'disabled'
            },
            {
                title: '密碼',
                name: 'password',
                type: 'password',
                value: user.password,
                disabled: 'disabled'
            },
            {
                title: '確認密碼',
                name: 'confirm',
                type: 'password',
                value: user.password,
                disabled: 'disabled'
            }]
        };

        return res.render('admin/user/update', {
            formData
        });
    } catch(err) {
        return next(err);
    }
};
