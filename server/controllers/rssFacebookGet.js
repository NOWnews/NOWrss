
const debug = require('debug')('NOWrss:controllers:RssFacebookGet');

let express = require('express');
let router = express.Router();

import moment from 'moment-timezone';
import libs from '../libs';

const isFacebookInstantArticle = true;

router.route('/rssFacebookGet')
    .get( async(req, res, next) => {

        try {
            let channelId = 'rssFacebookGet';
            let startTime = moment().tz('Asia/Taipei').add(-1, 'day').format('YYYY-MM-DD');
            let endTime = moment().tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss');
            let ISOTime = moment().tz('Asia/Taipei').format();

            let categoryOption = await libs.getApiCategories();

            categoryOption = _.map(categoryOption, (c) => { return c.name; });
            categoryOption = categoryOption.toString();

            // 目前子頻道還不會匯入 ia
            let subWebsiteList = [];

            let news = await libs.getNeedNewsFromApi(startTime, endTime, categoryOption, subWebsiteList, channelId, isFacebookInstantArticle);
            let rssXml = await libs.rssFacebookInstantArticleTp(news);

            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            return res.render(rssXml.xml, {
                items: rssXml.items,
                dateTime: ISOTime
            });

        } catch (err) {
            next(err);
        }
    })



module.exports = router;