
const debug = require('debug')('NOWrss:controllers:admin:count:page.one');

import { Count, Rss } from '../../../models';
import utils from '../../../utils';

import _ from 'lodash';
import moment from 'moment-timezone';
import useragent from 'express-useragent';

module.exports = async (req, res, next) => {

    let time = req.query.time || moment.tz('Asia/Taipei').format('YYYY-MM-DD');
    let channelId = req.params.channelId;
    let pathname = req._parsedUrl.pathname;
    try {
        let countList = await Count.find()
            .where('startDate').gte(moment.tz(time, 'Asia/Taipei').startOf('day'))
            .where('startDate').lte(moment.tz(time, 'Asia/Taipei').endOf('day'))
            .where('channelId').equals(channelId)
            .where('trashed').equals(false)
            .sort('startDate')
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

        let firstNewsSns = [];
        _.forEach(countList, (count, index) => {
            let checkNewsList = [];
            if (index === 0) {
                // 第一筆才會紀錄
                firstNewsSns = _.map(count.news, (news) => { return news.id; });
            } else {
                // 除了第一筆之外都來比對
                _.forEach(count.news, (news) => {
                    if (firstNewsSns.indexOf(news.id) < 0){
                        return checkNewsList.push(news);
                    }
                });
                count.news = checkNewsList;
            }

            count.startDate = utils.dateFormat(count.startDate, 'YYYY/MM/DD HH:mm');
            count.channel = channel[count.channelId];

            // 判斷 userAgent 的套件先暫時隱蔽
            count.userAgent = useragent.parse(count.userAgent);
        });

        return res.render('admin/count/one', {
            countList,
            time,
            pathname
        });

        // return res.json(countList);

    } catch(err) {
        return next(err);
    }
};
