
let express = require('express');
let router = express.Router();

const pageHome = require('./page.home.js');
const pageLogin = require('./page.login.js');
const actionLogin = require('./action.login.js');
const pageShow = require('./page.show.js');
const pageList = require('./page.list.js');

router.route('/admin/login')
    .post(actionLogin)
    .get(pageLogin);

router.route('/admin')
    .get(pageHome);

router.route('/admin/rss')
    .get(pageList);

module.exports = router;
