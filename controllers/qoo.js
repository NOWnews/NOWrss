const debug = require('debug')('NOWrss:controllers:qoo');

let express = require('express');
let co = require('co');
let router = express.Router();

let models = require('../models');
let caches = require('../caches');

router.route('/')
    .get( (req, res, next) => {
        co(function*() {
            let newUser = yield models.user.createAsync({
                name: 'Simon',
                nickname: 'Simon',
                oauthType: 'GOOGLE',
                oauthId: '1112222'
            });
            return res.json(newUser);
        });
    });

module.exports = router;
