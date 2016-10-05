const debug = require('debug')('NOWrss:controllers:rssGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const libs = require('../../libs');

let models = require('../../models');
let redis = require('../../redis');

let co = require('co');
let mongoose = require('mongoose');


router.route('/rss/:channelId')
    .get((req, res, next) => {
        let channelId = req.params.channelId.toLowerCase();

        co(function*() {
            let startTime = moment().tz('Asia/Taipei').add(-1, 'day');
            let endTime = moment().tz('Asia/Taipei');
            let ISOTime = moment().tz('Asia/Taipei').format();
            let dateTime = moment().tz('Asia/Taipei').format('ddd DD MMM YYYY HH:mm:ss ZZ');
            let TaiwanMobileDate = moment().tz('Asia/Taipei').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
            let UTCTime = moment().tz('Asia/Taipei').format('ddd, DD MMM YYYY HH:mm:ss [GMT]Z');

            let rssData = yield models.rss.findOne()
            .where('channelId').equals(channelId)
            .execAsync();

            if (!rssData) {
                res.status(404);
                return res.render('404');
            }

            let categoryOption = rssData.catogry.split(',');
            let simplifiedChinese = rssData.simplifiedChinese;

            debug('categoryOption = %s', categoryOption);
            debug('simplifiedChinese = %s', simplifiedChinese);

            let news = yield libs.getNeedNewsFromMongo(startTime, endTime, categoryOption, channelId);

            let rssXml = yield libs.buildRssFromNews(news, simplifiedChinese, rssData.template);

            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            res.render(rssXml.xml, {items: rssXml.items, dateTime: dateTime, TaiwanMobileDate: TaiwanMobileDate, ISOTime: ISOTime, UTCTime: UTCTime});
            // res.json(mainCategories);
        }).catch(next);

    });

module.exports = router;
