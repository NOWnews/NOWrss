
const debug = require('debug')('NOWrss:controllers:admin:rss:action.remove');
const models = require('../../../models');

const co = require('co');

module.exports = (req, res, next) => {

    let sn = req.params.sn;

    // debug('data = %j', data);

    co(function*() {

        let rssObj = yield models.rss.findBySn(sn);

        debug('rssObj = %j', rssObj);

        rssObj.set('trashed', true);
        let removedRssObj = yield rssObj.saveAsync();
        debug('removedRssObj = %j', removedRssObj);

        return res.json(removedRssObj);
    })
    .catch(next);
};
