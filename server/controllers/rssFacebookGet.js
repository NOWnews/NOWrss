const debug = require('debug')('NOWrss:controllers:rssFacebookGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const libs = require('../../libs');

let models = require('../../models');

let co = require('co');
let mongoose = require('mongoose');
const isFacebookInstantArticle = true;

router.route('/rssFacebookGet')
    .get((req, res, next) => {
        let channelId = 'rssFacebookGet';

        co(function*() {
            let startTime = moment().tz('Asia/Taipei').add(-1, 'day');
            let endTime = moment().tz('Asia/Taipei');
            let ISOTime = moment().tz('Asia/Taipei').format();
            //
            // let rssData = yield models.rss.findOne()
            // .where('channelId').equals(channelId)
            // .execAsync();

            let categoryOption = ['政治','財經','生活','地方','社會','運動','娛樂','國際','大陸','新奇','消費','旅遊','科技','健康','影音'];
            // let simplifiedChinese = rssData.simplifiedChinese;

            // debug('categoryOption = %s', categoryOption);
            // debug('simplifiedChinese = %s', simplifiedChinese);

            let news = yield libs.getNeedNewsFromMongo(startTime, endTime, categoryOption, channelId, isFacebookInstantArticle);

            let rssXml = yield libs.rssFacebookInstantArticleTp(news);

            // let rssXml = yield libs.buildRssFromNews(news, simplifiedChinese);


            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            res.render(rssXml.xml, {items: rssXml.items, dateTime: ISOTime});
            // res.send(rssXml);
        }).catch(next);

    });

module.exports = router;
