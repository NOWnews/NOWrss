
const debug = require('debug')('NOWrss:controllers:admin:rss:page.update');
const models = require('../../../../models');
const libs = require('../../../../newRsslibs');
const redis = require('../../../../redis');

const co = require('co');

module.exports = async (req, res, next) => {
    let sn = req.params.sn;

    try{    
        // 取得資料庫的分類
        let mainCategories = await redis.getMainCategoriesFromApiRedis();

        let rssData = await models.rss.findOne()
            .where('sn').equals(sn)
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        if (rssData.catogry === 'all'){
            let mainCategoriesString = _.map(mainCategories, (o) => o.value = true);
        } else {
            let mainCategoriesString = _.map(mainCategories, (o) => {
                if(rssData.catogry.indexOf(o.name) > -1) {
                    o.value = true;
                }
                return o;
            });
        }

        let startDate = libs.dateFormat(rssData.startDate);
        let endDate = libs.dateFormat(rssData.endDate);

        // 更新時將 channelId 改成大寫
        rssData.channelId = rssData.channelId.toUpperCase();

        debug('rssData = %j', rssData);

        let formData = {
            title: '更新廠商 RSS',
            action: `/admin/rss/update/${sn}`,
            method: 'put',
            formColumn: [{
                title: '名稱',
                name: 'name',
                type: 'text',
                value: rssData.name
            },
            {
                title: '選擇語系',
                name: 'simplifiedChinese',
                data: [{
                    title: '繁體',
                    value: 'false',
                    selected: rssData.simplifiedChinese === false ? 'selected' : ''
                },{
                    title: '簡體',
                    value: 'true',
                    selected: rssData.simplifiedChinese === true ? 'selected' : ''
                }],
                type: 'select'
            },
            {
                title: '分類',
                name: 'catogry',
                data: mainCategories,
                value: rssData.catogry,
                type: 'checkBox'
            },
            {
                title: '有效時間',
                name: 'dateRange',
                type: 'text',
                value: `${startDate} - ${endDate}`
            },
            {
                title: '選擇版型',
                name: 'template',
                data: [{
                    title: '基本版型',
                    value: 'DEFAULT',
                    selected: rssData.template === 'DEFAULT' ? 'selected' : ''
                },{
                    title: 'Yahoo 版型',
                    value: 'YAHOO',
                    selected: rssData.template === 'YAHOO' ? 'selected' : ''
                },{
                    title: 'Facebook InstantArticle 版型',
                    value: 'FACEBOOK',
                    selected: rssData.template === 'FACEBOOK' ? 'selected' : ''
                },{
                    title: '台灣大哥大 版型',
                    value: 'TAIWANMOBILE',
                    selected: rssData.template === 'TAIWANMOBILE' ? 'selected' : ''
                },{
                    title: '社群用 版型',
                    value: 'SOCIAL',
                    selected: rssData.template === 'SOCIAL' ? 'selected' : ''
                }],
                type: 'select'
            },
            {
                title: '限定的IP',
                name: 'confirmIP',
                type: 'text',
                value: rssData.confirmIP,
                disabled: 'disabled'
            },
            {
                title: '頻道的ID',
                name: 'channelId',
                type: 'text',
                value: rssData.channelId
            },
            {
                title: '聯絡人資料 ( ex. 吳OO - 09xx123456 )',
                name: 'contactPerson',
                type: 'text',
                value: rssData.contactPerson
            }]
        };

        return res.render('admin/rss/update', {
            formData
        });
    }catch(err){
        next(err);
    }
    
};
