const debug = require('debug')('NOWrss:controllers:test');
let express = require('express');
let router = express.Router();

let models = require('../../models');
let redis = require('../../redis');

let Promise = require('bluebird');
let co = require('co');
let RSS = require('rss');
let fetch = require('node-fetch');
var parser = require('xml2json');

router.route('/')
    .get((req, res, next) => {
        let xmlUrl = 'http://feed.nownews.com/rss/34980269-E832-4C63-9F25-5FB1D135852A';

        fetch( xmlUrl, {
                timeout: 1000
            })
            .then((res) => {
                return res.text();
            }).then((xml) => {
                var json = parser.toJson(xml, {
                    object: true,
                });
                let data = json.rss.channel;
                let feed = new RSS({
                    title: data.title,
                    image_url: data.image.url,
                    link: data.link,
                    language: data.language,
                    pubDate: new Date(),
                    description: data.description,
                    copyright: data.copyright,
                    ttl: data.ttl
                });
                _.map(data.item, (v,i)=>{
                    if(true){
                        feed.item({
                            title: v.title + i,
                            // description: v.description
                            custom_elements: [
                                {description: v.description}
                            ]
                        });
                    }
                });
                res.charset = 'utf-8';
                res.set('Content-Type', 'text/xml');
                // res.json(json)
                res.send(feed.xml({indent: true}));
            });
    });

module.exports = router;
