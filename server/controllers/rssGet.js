const debug = require('debug')('NOWrss:controllers:rssGet');


let express = require('express');
let router = express.Router();

const moment = require('moment-timezone');
const libs = require('../../libs');

let models = require('../../models');
let caches = require('../../caches');

let RSS = require('rss');
let co = require('co');
let mongoose = require('mongoose');


router.route('/:id')
    .get((req, res, next) => {
        let id = mongoose.Types.ObjectId(req.params.id);

        co(function*() {
            let startTime = moment(Date.now()).add(-15, 'm');
            let endTime = moment(Date.now());
            let rssData = yield models.rss.findOne()
            .where('_id').equals(id)
            .execAsync();

            // console.log('L28', rssData.catogry);

            let news = yield libs.getNeedNewsFromMongo(startTime, endTime);

            let rssXml = yield libs.buildRssFromNews(news);


            // res.charset = 'utf-8';
            // res.set('Content-Type', 'text/xml');
            // res.send(rssXml);
            res.json(news);
        }).catch(next);

    });

module.exports = router;
