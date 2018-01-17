
const debug = require('debug')('NOWrss:controllers:RssGet');

const express = require('express');
const router = express.Router();

import moment from 'moment-timezone';
import uuid from 'uuid';
import utils from '../utils';
import libs from '../libs';
import { Rss, Count } from '../models';

router.route('/rss/:channelId')
    .get(async(req, res, next) => {
        try {
            let channelId = req.params.channelId.toLowerCase();
            let UUID = uuid.v4();
            let startTime = moment().tz('Asia/Taipei').add(-100, 'day').format('YYYY-MM-DD');
            let today = moment().tz('Asia/Taipei');
            let endTime = today.add(-3, 'm').format('YYYY-MM-DDTHH:mm:ss');
            let ISOTime = today.format();
            let dateTime = today.format('ddd DD MMM YYYY HH:mm:ss ZZ');
            let TaiwanMobileDate = today.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
            let UTCTime = today.format('ddd, DD MMM YYYY HH:mm:ss [GMT]Z');
            let milliseconds = today.valueOf();
            let unixTimestamp = today.unix();

            // 這裡是確認 rssData 有沒有這筆資料
            let rssData = await Rss.findOne()
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

            let news = await libs.getNeedNewsFromApi(startTime, endTime, rssData.catogry, rssData.subWebsite, channelId, false, rssData.template);
            let rssXml = await libs.buildRssFromNews(news, simplifiedChinese, rssData.template);

            let xmlData = {
                items: rssXml.items,
                dateTime,
                TaiwanMobileDate,
                ISOTime,
                UTCTime,
                milliseconds,
                UUID,
                unixTimestamp
            };

            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml').render(rssXml.xml, xmlData);

            // 統計用資料
            let newsList = [];
            _.forEach(news, (n) => {
                return newsList.push({
                    title: n.title,
                    id: n.sn,
                    startedAt: n.formatStartedAt
                });
            });
            let countObj = {
                channelId: req.params.channelId,
                ip: req.ip,
                news: newsList,
                userAgent: req.headers['user-agent'],
                createdAt: req._startTime
              };
            await Count.createAsync(countObj);

            return;
        } catch (err) {
            next(err);
        }
    })

module.exports = router;