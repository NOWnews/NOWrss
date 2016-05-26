
let express = require('express');
let router = express.Router();

const pageHome = require('./page.home.js');

const pageLogin = require('./page.login.js');
const actionLogin = require('./action.login.js');

const pageUserList = require('./user/page.list.js');
const pageUserCreate = require('./user/page.create.js');
const actionUserCreate = require('./user/action.create.js');
const pageUserUpdate = require('./user/page.update.js');
const actionUserUpdate = require('./user/action.update.js');

const pageRssList = require('./rss/page.list.js');
const pageRssCreate = require('./rss/page.create.js');
const actionRssCreate = require('./rss/action.create.js');
const pageRssUpdate = require('./rss/page.update.js');
const actionRssUpdate = require('./rss/action.update.js');


router.route('/admin/login')
    .post(actionLogin)
    .get(pageLogin);

/*
 * ############## User 設定 ##############
 */
router.route('/admin/user')
    .get(pageUserList);

router.route('/admin/user/create')
    .get(pageUserCreate)
    .post(actionUserCreate);

router.route('/admin/user/update/:id')
    .get(pageUserUpdate)
    .put(actionUserUpdate);

/*
 * ############## Rss 設定 ##############
 */

router.route('/admin/rss')
    .get(pageRssList);

router.route('/admin/rss/create')
    .get(pageRssCreate)
    .post(actionRssCreate);

router.route('/admin/rss/update/:id')
    .get(pageRssUpdate)
    .put(actionRssUpdate);


router.route('/admin')
    .get(pageHome);

module.exports = router;
