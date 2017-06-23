
let express = require('express');
let router = express.Router();

import pageHome from './page.home';

import pageLogin from './auth/page.login';
import actionLogin from './auth/action.login';
import actionLogout from './auth/action.logout';

import pageCountList from './count/page.list';
import pageCountOne from './count/page.one';

import pageUserList from './user/page.list';
import pageUserCreate from './user/page.create';
import actionUserCreate from './user/action.create';
import pageUserUpdate from './user/page.update';
import actionUserUpdate from './user/action.update';

import pageRssList from './rss/page.list';
import pageRssCreate from './rss/page.create';
import actionRssCreate from './rss/action.create';

import pageRssUpdate from './rss/page.update';
import actionRssUpdate from './rss/action.update';
import actionRssRemove from './rss/action.remove';

import isLogin from '../../middlewares/isLogin';
import saveUrlType from '../../middlewares/saveUrlType';

/*
 * ############## login 設定 ##############
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
    .get(isLogin, pageRssList);

/*
 * ############## Rss 統計 ##############
 */

router.route('/admin/count')
    .get(isLogin, saveUrlType, pageCountList);

router.route('/admin/count/:channelId')
    .get(isLogin, saveUrlType, pageCountOne);

// TODO 暫時用
router.route('/')
    .get(isLogin, pageRssList);

module.exports = router;
