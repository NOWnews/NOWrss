const debug = require('debug')('NOWrss:controllers:rssGet');

let express = require('express');
let router = express.Router();

let models = require('../../models');
let caches = require('../../caches');

let RSS = require('rss');
let co = require('co');
let mongoose = require('mongoose');


router.route('/:id')
    .get((req, res, next) => {
        let id = mongoose.Types.ObjectId(req.params.id);

        co(function*() {
            let rssData = yield models.rss.findOne()
            .where('_id').equals(id)
            .execAsync();
            res.json(rssData);
        }).catch(next);

    });

module.exports = router;
