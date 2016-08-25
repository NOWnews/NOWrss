const debug = require('debug')('NOWrss:controllers:rssGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const libs = require('../../libs');

let models = require('../../models');
let redis = require('../../redis');

let RSS = require('rss');
let co = require('co');
let mongoose = require('mongoose');


router.route('/rss/:channelId')
    .get((req, res, next) => {
        let channelId = req.params.channelId.toLowerCase();

        co(function*() {
            let startTime = moment().tz('Asia/Taipei').add(-1, 'day');
            let endTime = moment().tz('Asia/Taipei');

            let rssData = yield models.rss.findOne()
            .where('channelId').equals(channelId)
            .execAsync();

            let categoryOption = rssData.catogry.split(',');
            let simplifiedChinese = rssData.simplifiedChinese;

            debug('categoryOption = %s', categoryOption);
            debug('simplifiedChinese = %s', simplifiedChinese);

            let news = yield libs.getNeedNewsFromMongo(startTime, endTime, categoryOption, channelId);

            let rssXml = yield libs.buildRssFromNews(news, simplifiedChinese, rssData.template);


            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            res.send(rssXml);
            // res.json(mainCategories);
        }).catch(next);

    });

module.exports = router;
