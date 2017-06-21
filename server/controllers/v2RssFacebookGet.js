const debug = require('debug')('NOWrss:controllers:v2RssFacebookGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const libs = require('../libs');
const redis = require('../redis');


const isFacebookInstantArticle = true;

router.route('/rssFacebookGet')
    .get( async(req, res, next) => {

        try {
            let channelId = 'rssFacebookGet';
            let startTime = moment().tz('Asia/Taipei').add(-1, 'day').format('YYYY-MM-DD');
            let endTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
            let ISOTime = moment().tz('Asia/Taipei').format();

            let categoryOption = await redis.getApiCategories();

            categoryOption = _.map(categoryOption, (c) => { return c.name; });
            categoryOption = categoryOption.toString();

            // let categoryOption = ['政治', '財經', '生活', '地方', '社會', '運動', '娛樂', '國際', '大陸', '新奇', '消費', '旅遊', '科技', '健康', '影音'];

            let news = await libs.getNeedNewsFromApi(startTime, endTime, categoryOption, channelId, isFacebookInstantArticle);
            let rssXml = await libs.rssFacebookInstantArticleTp(news);


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