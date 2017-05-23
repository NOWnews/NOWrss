
const debug = require('debug')('NOWrss:controllers:admin:rss:page.create');
const libs = require('../../../../libs');
const redis = require('../../../../redis');

const co = require('co');

module.exports = (req, res, next) => {
    co(function*() {
        // 取得資料庫或 API 的分類
        let v2Router = '/admin/rss/v2';
        let thisRouter = req.route.path;
        let isV2Router = thisRouter.indexOf(v2Router) > -1;
        let mainCategories = isV2Router ? yield redis.getApiCategories() : yield redis.getMongoCategories();

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
                title: '選擇語系',
                name: 'simplifiedChinese',
                data: [{
                    title: '繁體',
                    value: 'false',
                    attr: 'selected'
                },{
                    title: '簡體',
                    value: 'true'
                }],
                type: 'select'
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
                title: '選擇版型',
                name: 'template',
                data: [{
                    title: '基本版型',
                    value: 'DEFAULT',
                    attr: 'selected'
                },{
                    title: 'Line 版型',
                    value: 'LINE'
                },{
                    title: 'Yahoo 版型',
                    value: 'YAHOO'
                },{
                    title: 'Facebook InstantArticle 版型',
                    value: 'FACEBOOK'
                },{
                    title: '台灣大哥大 版型',
                    value: 'TAIWANMOBILE'
                },{
                    title: '社群用 版型',
                    value: 'SOCIAL'
                }],
                type: 'select'
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
