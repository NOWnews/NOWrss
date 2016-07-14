
const debug = require('debug')('NOWrss:controllers:admin:rss:page.list');
const models = require('../../../../models');
const libs = require('../../../../libs');

const _ = require('lodash');
const co = require('co');

module.exports = (req, res, next) => {
    co(function*() {

        let rssList = yield models.rss.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        _.forEach(rssList, (rss)=>{
            let startDate = libs.dateFormat(rss.startDate);
            let endDate = libs.dateFormat(rss.endDate);

            rss.dateRange = `${startDate} - ${endDate}`;
            // 列表時將 channelId 改成大寫
            rss.channelId = rss.channelId.toUpperCase();
        });

        return res.render('admin/rss/list', {
            rssList
        });
    })
    .catch(next);
};
