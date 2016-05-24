
let express = require('express');
let router = express.Router();

const pageHome = require('./page.home.js');
const pageShow = require('./page.show.js');
const pageList = require('./page.list.js');

router.route('/')
    .get(pageHome);

router.route('/rss')
    .get(pageList);

module.exports = router;
