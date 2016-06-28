
const debug = require('debug')('NOWrss:controllers:admin:rss:page.create');
const models = require('../../../../models');
const libs = require('../../../../libs');

const co = require('co');

module.exports = (req, res, next) => {
    co(function*() {
        // 取得資料庫的分類
        let mainCategories = yield libs.getAllMainCategory();

        let formData = {
            title: '建立廠商 RSS',
            action: '/admin/rss/create',
            method: 'post',
            formColumn: [{
                title: '名稱',
                name: 'name',
                type: 'text'
            },
            {
                title: '分類',
                name: 'catogry',
                data: mainCategories,
                type: 'checkBox'
            },
            {
                title: '有效時間',
                name: 'dateRange',
                type: 'dateRange'
            },
            {
                title: '限定的IP',
                name: 'confirmIP',
                type: 'text'
            },
            {
                title: '聯絡人資料 ( ex. 吳OO - 09xx123456 )',
                name: 'contactPerson',
                type: 'text'
            }]
        };

        return res.render('admin/rss/create', {
            formData
        });
    });
};
