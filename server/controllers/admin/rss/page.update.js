
const debug = require('debug')('NOWrss:controllers:admin:rss:page.update');
const models = require('../../../../models');
const libs = require('../../../../libs');

const co = require('co');

module.exports = (req, res, next) => {
    let sn = req.params.sn;

    co(function*() {

        let rssData = yield models.rss.findOne()
            .where('sn').equals(sn)
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        let startDate = libs.dateFormat(rssData.startDate);
        let endDate = libs.dateFormat(rssData.endDate);

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
                title: '分類(請用 , 隔開)',
                name: 'catogry',
                type: 'text',
                value: rssData.catogry,
            },
            {
                title: '有效時間',
                name: 'dateRange',
                type: 'text',
                value: `${startDate} - ${endDate}`
            },
            {
                title: '限定的IP',
                name: 'confirmIP',
                type: 'text',
                value: rssData.confirmIP,
                disabled: 'disabled'
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
    })
    .catch(next);
};
