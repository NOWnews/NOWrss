
const debug = require('debug')('NOWrss:controllers:admin:count:page.list');
const models = require('../../../models');
const utils = require('../../../utils');

const _ = require('lodash');
const co = require('co');
const useragent = require('express-useragent');

module.exports = (req, res, next) => {
    co(function*() {

        let countList = yield models.count.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        let rssList = yield models.rss.find()
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
    })
    .catch(next);
};
