const debug = require('debug')('NOWrss:controllers:qoo');

let express = require('express');
let router = express.Router();

let models = require('../../models');
let redis = require('../../redis');

let RSS = require('rss');


router.route('/')
    .get((req, res, next) => {

        let feed = new RSS({
            title: '標題',
            description: '描述',
            link: 'http://www.example.com/main.html',
            lastBuildDate: new Date(),
            pubDate: new Date(),
            ttl: '1800'
        });

        feed.item({
            title: '標題',
            description: '描述',
            link: ' gj;3k27',
            guid:'爽',
            pubDate: new Date()
        });

        res.charset = 'utf-8';
        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    });

module.exports = router;
