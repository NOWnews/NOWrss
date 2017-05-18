
const debug = require('debug')('NOWrss:controllers:admin:rss:page.list');
const models = require('../../../../models');
const utils = require('../../../../utils');

const _ = require('lodash');
const co = require('co');

module.exports = (req, res, next) => {
    co(function*() {

        let rssList = yield models.rss.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        _.forEach(rssList, (rss)=>{
            let startDate = utils.dateFormat(rss.startDate);
            let endDate = utils.dateFormat(rss.endDate);

            rss.dateRange = `${startDate} - ${endDate}`;
            // 列表時將 channelId 改成大寫
            rss.channelId = rss.channelId.toUpperCase();

            //確認是否過期
            rss.isExpired = utils.checkDateRange(rss.startDate, rss.endDate);
        });
        return res.render('admin/rss/new-list', {
            rssList
        });
    })
    .catch(next);
};
