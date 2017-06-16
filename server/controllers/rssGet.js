const debug = require('debug')('NOWrss:controllers:rssGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const libs = require('../../libs');
const utils = require('../../utils');
const uuid = require('uuid');

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
            let milliseconds = moment().tz('Asia/Taipei').valueOf();
            let UUID = uuid.v4();

            let rssData = yield models.rss.findOne()
            .where('channelId').equals(channelId)
            .execAsync();

            if (!rssData) {
                res.status(404);
                return res.render('404');
            }

            // 如果過期
            let isExpired = utils.checkDateRange(rssData.startDate, rssData.endDate);
            if(isExpired){
                console.error(`/rss/${req.params.channelId} 此頁面已過期`)
                res.status(404);
                return res.render('404');
            }

            let categoryOption = rssData.catogry.split(',');
            let simplifiedChinese = rssData.simplifiedChinese;

            debug('categoryOption = %s', categoryOption);
            debug('simplifiedChinese = %s', simplifiedChinese);

            let news = yield libs.getNeedNewsFromMongo(startTime, endTime, categoryOption, channelId);

            let rssXml = yield libs.buildRssFromNews(news, simplifiedChinese, rssData.template);

            let xmlData = {
                items: rssXml.items,
                dateTime,
                TaiwanMobileDate,
                ISOTime,
                UTCTime,
                milliseconds,
                UUID
            }

            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            res.render(rssXml.xml, xmlData);

            // 統計用資料
            let newsList = [];
            _.forEach(news, (n)=>{
                return newsList.push({
                    title: n.title,
                    id: n._id,
                    startedAt: n.field_release_date.value * 1000
                });
            });
            let countObj = {
                channelId: req.params.channelId,
                ip: req.ip,
                news: newsList,
                userAgent: req.headers['user-agent'],
                createdAt: req._startTime
            };
            yield models.count.createAsync(countObj);
            return;

        }).catch(next);

    });

module.exports = router;
