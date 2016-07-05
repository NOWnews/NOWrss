
let express = require('express');
let router = express.Router();

const pageHome = require('./page.home');

const pageLogin = require('./auth/page.login');
const actionLogin = require('./auth/action.login');
const actionLogout = require('./auth/action.logout');

const pageUserList = require('./user/page.list');
const pageUserCreate = require('./user/page.create');
const actionUserCreate = require('./user/action.create');
const pageUserUpdate = require('./user/page.update');
const actionUserUpdate = require('./user/action.update');

const pageRssList = require('./rss/page.list');
const pageRssCreate = require('./rss/page.create');
const actionRssCreate = require('./rss/action.create');
const pageRssUpdate = require('./rss/page.update');
const actionRssUpdate = require('./rss/action.update');
const actionRssRemove = require('./rss/action.remove');

const isLogin = require('../../middlewares/isLogin');
const saveUrlType = require('../../middlewares/saveUrlType');


/*
 * ############## User 設定 ##############
 */
router.route('/admin/auth/login')
    .post(actionLogin)
    .get(pageLogin);

router.route('/admin/auth/logout')
    .get(actionLogout);


/*
 * ############## User 設定 ##############
 */
router.route('/admin/user')
    .get(isLogin, saveUrlType, pageUserList);

router.route('/admin/user/create')
    .get(isLogin, saveUrlType, pageUserCreate)
    .post(isLogin, actionUserCreate);

router.route('/admin/user/update/:sn')
    .get(isLogin, saveUrlType, pageUserUpdate)
    .put(isLogin, actionUserUpdate);

/*
 * ############## Rss 設定 ##############
 */

router.route('/admin/rss')
    .get(isLogin, saveUrlType, pageRssList);

router.route('/admin/rss/create')
    .get(isLogin, saveUrlType, pageRssCreate)
    .post(isLogin, actionRssCreate);

router.route('/admin/rss/update/:sn')
    .get(isLogin, saveUrlType, pageRssUpdate)
    .put(isLogin, actionRssUpdate);

router.route('/admin/rss/delete/:sn')
    .delete(isLogin, actionRssRemove);


router.route('/admin')
    .get(isLogin, pageHome);

// TODO 暫時用
router.route('/')
    .get(isLogin, pageHome);

module.exports = router;
