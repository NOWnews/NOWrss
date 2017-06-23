
const debug = require('debug')('NOWrss:controllers:admin:count:page.list');

import { Count, Rss } from '../../../models';
import utils from '../../../utils';

import _ from 'lodash';
import moment from 'moment';
import useragent from 'express-useragent';

module.exports = async (req, res, next) => {

    let time = req.query.time || utils.dateFormat(moment(), 'YYYY/MM/DD');
    let pathname = req._parsedUrl.pathname;
    try {
        let countList = await Count.find()
            .where('startDate').gte(moment(time).startOf('day'))
            .where('startDate').lte(moment(time).endOf('day'))
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        let rssList = await Rss.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();
        let channels = {};

        _.forEach(rssList, (rss) => {
            channels[rss.channelId.toUpperCase()] = {
                name: rss.name,
                sn: rss.sn,
                count: 0
            };
            return;
        });

        _.forEach(countList, (count) => {
            channels[count.channelId].count++;
        });

        return res.render('admin/count/list', {
            channels,
            time,
            pathname
        });

    } catch(err) {
        return next(err);
    }
};
