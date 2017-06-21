
const debug = require('debug')('NOWrss:controllers:admin:rss:action.create');
const models = require('../../../models');
const libs = require('../../../libs');

const co = require('co');
const uuid = require('uuid');

module.exports = (req, res, next) => {

    let data = req.body;

    data.startDate = data.dateRange.split('-')[0].replace(/(^[\s]*)|([\s]*$)/g, '');
    data.endDate = data.dateRange.split('-')[1].replace(/(^[\s]*)|([\s]*$)/g, '');

    // debug('data = %j', data);

    co(function*() {
        var rssObj = {
            name: data.name,
            simplifiedChinese: data.simplifiedChinese,
            catogry: data.catogry,
            startDate: data.startDate,
            endDate: data.endDate,
            confirmIP: data.confirmIP || '',
            template: data.template,
            contactPerson: data.contactPerson,
            channelId: uuid()
        };

        yield models.rss.createAsync(rssObj);

        return res.redirect('/admin/rss');
    })
    .catch(next);
};
