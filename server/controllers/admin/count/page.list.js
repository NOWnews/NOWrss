
const debug = require('debug')('NOWrss:controllers:admin:count:page.list');

import { Count, Rss } from '../../../models';
import utils from '../../../utils';

import _ from 'lodash';
import useragent from 'express-useragent';

module.exports = async (req, res, next) => {
    try {
        let countList = await Count.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        let rssList = await Rss.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();
        let channel = {};

        _.forEach(rssList, (rss) => {
            channel[rss.channelId.toUpperCase()] = {
                name: rss.name,
                sn: rss.sn
            };
            return;
        });

        _.forEach(countList, (count)=>{
            count.startDate = utils.dateFormat(count.startDate, 'YYYY/MM/DD HH:mm');
            count.channel = channel[count.channelId];

            // 判斷 userAgent 的套件先暫時隱蔽
            // count.userAgent = useragent.parse(count.userAgent);
        });

        return res.render('admin/count/list', {
            countList
        });

        // return res.json(countList);

    } catch(err) {
        return next(err);
    }
};
