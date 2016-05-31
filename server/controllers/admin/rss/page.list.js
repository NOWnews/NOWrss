
const debug = require('debug')('NOWrss:controllers:admin:rss:page.list');
const models = require('../../../../models');
const libs = require('../../../../libs');

const _ = require('lodash');
const moment = require('moment-timezone');
const co = require('co');

module.exports = (req, res, next) => {
    co(function*() {

        let rssList = yield models.rss.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        _.forEach(rssList, (rss)=>{
            let startDate = moment(rss.startDate)
                .tz('Asia/Taipei')
                .format('YYYY/MM/DD');
            let endDate = moment(rss.endDate)
                .tz('Asia/Taipei')
                .format('YYYY/MM/DD');
            rss.dateRange = `${startDate} - ${endDate}`;
        });

        return res.render('admin/rss/list', {
            rssList
        });
    })
    .catch(next);
};
