const debug = require('debug')('NOWrss:controllers:v2RssFacebookGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const v2RssLibs = require('../../v2RssLibs');

let models = require('../../models');

let co = require('co');
let mongoose = require('mongoose');
const isFacebookInstantArticle = true;

router.route('/v2/rssFacebookGet')
    .get( async(req, res, next) => {

        try {
            let channelId = 'rssFacebookGet';
            let startTime = moment().tz('Asia/Taipei').add(-1, 'day');
            let endTime = moment().tz('Asia/Taipei');
            let ISOTime = moment().tz('Asia/Taipei').format();

            let categoryOption = ['政治', '財經', '生活', '地方', '社會', '運動', '娛樂', '國際', '大陸', '新奇', '消費', '旅遊', '科技', '健康', '影音'];

            let news = await v2RssLibs.getNeedNewsFromApi(startTime, endTime, categoryOption, channelId, isFacebookInstantArticle);
            let rssXml = await v2RssLibs.rssFacebookInstantArticleTp(news);


            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            res.render(rssXml.xml, {
                items: rssXml.items,
                dateTime: ISOTime
            });
        } catch (err) {
            next(err);
        }
    })



module.exports = router;