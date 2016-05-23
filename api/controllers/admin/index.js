
let express = require('express');
let router = express.Router();

const pageShow = require('./page.show.js');
const pageList = require('./page.list.js');

router.route('/')
    .get(pageShow);

router.route('/rss')
    .get(pageList);

module.exports = router;
