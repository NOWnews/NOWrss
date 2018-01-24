
const debug = require('debug')('NOWrss:controllers:admin:rss:page.create');

import libs from '../../../libs';

module.exports = async (req, res, next) => {

    try {
        // 取得資料庫或 API 的分類
        let mainCategories = await libs.getApiCategories();
        let subWebsiteList = libs.getSubWebsite();

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
                title: '子網站',
                name: 'subWebsite',
                data: subWebsiteList,
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
                    title: 'Line TW 版型',
                    value: 'LINE-TW'
                },{
                    title: 'Line HK 版型',
                    value: 'LINE-HK'
                },{
                    title: 'Yahoo 版型',
                    value: 'YAHOO_2'
                },{
                    title: '台灣大哥大 版型',
                    value: 'TAIWANMOBILE'
                },{
                    title: '新浪 版型',
                    value: 'SINATW'
                },{
                    title: 'Xone 版型',
                    value: 'XONE'
                },{
                    title: '社群用 版型',
                    value: 'SOCIAL'
                },{
                    title: '第三方工具 描述版型',
                    value: 'DEFAULTDESC'
                }//,{
                 //   title: 'Facebook InstantArticle 版型',
                 //   value: 'FACEBOOK'
                //}
                ],
                type: 'select'
            },
            // {
            //     title: '限定的IP',
            //     name: 'confirmIP',
            //     type: 'text'
            // },
            {
                title: '聯絡人資料 ( ex. 吳OO - 09xx123456 )',
                name: 'contactPerson',
                type: 'text'
            }]
        };

        return res.render('admin/rss/create', {
            formData
        });
    } catch(err) {
        return next(err);
    }
};
