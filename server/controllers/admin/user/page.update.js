
const debug = require('debug')('NOWrss:controllers:admin:user:page.update');
const models = require('../../../../models');
const libs = require('../../../../libs');

module.exports = (req, res, next) => {
    let formData = {
        title: '更新管理者',
        action: '/admin/user/create',
        method: 'put',
        formColumn: [{
            title: '姓名',
            name: 'name',
            type: 'text'
        },
        {
            title: 'E-mail',
            name: 'email',
            type: 'email'
        },
        {
            title: '密碼',
            name: 'password',
            type: 'password'
        },
        {
            title: '確認密碼',
            name: 'checkPassword',
            type: 'password'
        }]
    };
    return res.render('admin/user/update', {
        formData
    });
};
