const debug = require('debug')('NOWrss:controllers:v2RssGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const uuid = require('node-uuid');

const v2RssLibs = require('../../v2RssLibs');
const utils = require('../../utils');
const models = require('../../models');

router.route('/rss/:channelId')
    .get(async(req, res, next) => {
        try {
            let channelId = req.params.channelId.toLowerCase();
            let UUID = uuid.v4();
            let startTime = moment().tz('Asia/Taipei').add(-100, 'day').format('YYYY-MM-DD');
            let today = moment().tz('Asia/Taipei');
            let endTime = today.format('YYYY-MM-DD');
            let ISOTime = today.format();
            let dateTime = today.format('ddd DD MMM YYYY HH:mm:ss ZZ');
            let TaiwanMobileDate = today.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
            let UTCTime = today.format('ddd, DD MMM YYYY HH:mm:ss [GMT]Z');
            let milliseconds = today.valueOf();

            // 這裡是確認 rssData 有沒有這筆資料
            let rssData = await models.rss.findOne()
                .where('channelId').equals(channelId)
                .execAsync();

            if (!rssData) {
                return res.status(404).render('404');
            }

            // 如果過期
            let isExpired = utils.checkDateRange(rssData.startDate, rssData.endDate);
            if (isExpired) {
                console.error(`/rss/${req.params.channelId} 此頁面已過期`)
                return res.status(404).render('404');
            }

            // 確認簡體語系
            let simplifiedChinese = rssData.simplifiedChinese;
            debug('simplifiedChinese = %s', simplifiedChinese);

            let news = await v2RssLibs.getNeedNewsFromApi(startTime, endTime, rssData.catogry, channelId);
            let rssXml = await v2RssLibs.buildRssFromNews(news, simplifiedChinese, rssData.template);

            let xmlData = {
                items: rssXml.items,
                dateTime,
                TaiwanMobileDate,
                ISOTime,
                UTCTime,
                milliseconds,
                UUID
            };

            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml').render(rssXml.xml, xmlData);
            // res.json(xmlData);
        } catch (err) {
            next(err);
        }
    })

module.exports = router;