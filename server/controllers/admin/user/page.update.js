
const debug = require('debug')('NOWrss:controllers:admin:user:page.update');
const models = require('../../../models');
const libs = require('../../../libs');

const co = require('co');

module.exports = (req, res, next) => {
    let sn = req.params.sn;

    co(function*() {

        let user = yield models.user.findOne()
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
    })
    .catch(next);
};
