
const debug = require('debug')('NOWrss:controllers:admin:rss:page.list');

import { Rss } from '../../../models';
import utils from '../../../utils';

import _ from 'lodash';

module.exports = async (req, res, next) => {
    try {
        let rssList = await Rss.find()
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
            rss.createdAt = utils.dateFormat(rss.createdAt, 'YYYY/MM/DD HH:mm');
        });
        return res.render('admin/rss/list', {
            rssList
        });
    } catch(err) {
        return next(err);
    }
};
