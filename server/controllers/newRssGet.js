const debug = require('debug')('NOWrss:controllers:newRssGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const newRssLibs = require('../../newRssLibs');
const utils = require('../../utils');

let models = require('../../models');
let redis = require('../../redis');

let co = require('co');
let mongoose = require('mongoose');


router.route('/new/rss/:channelId')
    .get(async(req, res, next) => {
        try {
            let channelId = req.params.channelId.toLowerCase();
            let startTime = moment().tz('Asia/Taipei').add(-1, 'day');
            let endTime = moment().tz('Asia/Taipei');
            let ISOTime = moment().tz('Asia/Taipei').format();
            let dateTime = moment().tz('Asia/Taipei').format('ddd DD MMM YYYY HH:mm:ss ZZ');
            let TaiwanMobileDate = moment().tz('Asia/Taipei').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
            let UTCTime = moment().tz('Asia/Taipei').format('ddd, DD MMM YYYY HH:mm:ss [GMT]Z');

            // 這裡是確認 rssData 有沒有這筆資料
            let rssData = await models.rss.findOne()
                .where('channelId').equals(channelId)
                .execAsync();

            if (!rssData) {
                res.status(404);
                return res.render('404');
            }

            // 如果過期
            let isExpired = utils.checkDateRange(rssData.startDate, rssData.endDate);
            if (isExpired) {
                console.error(`/rss/${req.params.channelId} 此頁面已過期`)
                res.status(404);
                return res.render('404');
            }

            let simplifiedChinese = rssData.simplifiedChinese;

            debug('simplifiedChinese = %s', simplifiedChinese);
            // ---------------

            let news = await newRssLibs.getNeedNewsFromApi(startTime, endTime, rssData.catogry, channelId);

            // return res.json(news);

            let rssXml = await newRssLibs.buildRssFromNews(news, simplifiedChinese, rssData.template);

            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            res.render(rssXml.xml, {
                items: rssXml.items,
                dateTime: dateTime,
                TaiwanMobileDate: TaiwanMobileDate,
                ISOTime: ISOTime,
                UTCTime: UTCTime
            });
            // res.json(mainCategories);
        } catch (err) {
            next(err);
        }
    })

module.exports = router;