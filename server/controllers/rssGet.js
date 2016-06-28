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


router.route('rss/:id')
    .get((req, res, next) => {
        let id = mongoose.Types.ObjectId(req.params.id);

        co(function*() {
            let startTime = moment().add(-1, 'day');
            let endTime = moment();

            let rssData = yield models.rss.findOne()
            .where('_id').equals(id)
            .execAsync();

            let categoryOption = rssData.catogry.split(',');

            debug('categoryOption = %s', categoryOption);

            let news = yield libs.getNeedNewsFromMongo(startTime, endTime, categoryOption);

            let rssXml = yield libs.buildRssFromNews(news);


            res.charset = 'utf-8';
            res.set('Content-Type', 'text/xml');
            res.send(rssXml);
            // res.json(mainCategories);
        }).catch(next);

    });

module.exports = router;
