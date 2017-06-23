
const debug = require('debug')('NOWrss:controllers:admin:rss:action.remove');
import { Rss } from '../../../models';

module.exports = async (req, res, next) => {

    let sn = req.params.sn;

    // debug('data = %j', data);

    try {
        let rssObj = await Rss.findBySn(sn);

        debug('rssObj = %j', rssObj);

        rssObj.set('trashed', true);
        let removedRssObj = await rssObj.saveAsync();
        debug('removedRssObj = %j', removedRssObj);

        return res.json(removedRssObj);
    } catch(err) {
        return next(err);
    }
};
