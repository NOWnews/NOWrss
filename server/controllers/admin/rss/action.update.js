
const debug = require('debug')('NOWrss:controllers:admin:rss:action.update');
import { Rss } from '../../../models';
import libs from '../../../libs';

module.exports = async (req, res, next) => {
    const updateFields = ['name', 'dateRange', 'contactPerson', 'catogry', 'template', 'channelId', 'simplifiedChinese'];
    let data = _.pick(req.body, updateFields);
    let sn = req.params.sn;

    if(!data.catogry) {
        return next(new Error('至少要填入一個分類'));
    }

    // debug('req.body = %j', req.body);
    try {
        let rssModels = await Rss.findBySn(sn);

        // 儲存時將 channelId 改成小寫
        if(data.channelId){
            data.channelId = data.channelId.toLowerCase();
        }

        updateFields.forEach(function(field) {
            if(field === 'dateRange'){
                let startDate = data.dateRange.split('-')[0].replace(/(^[\s]*)|([\s]*$)/g, '');
                let endDate = data.dateRange.split('-')[1].replace(/(^[\s]*)|([\s]*$)/g, '');

                rssModels.set('startDate', startDate);
                rssModels.set('endDate', endDate);
            }

            rssModels.set(field, data[field]);
        });

        let updatedRssModels = await rssModels.saveAsync();

        return res.redirect(`/admin/rss`);
    } catch(err) {
        return next(err);
    }
};
