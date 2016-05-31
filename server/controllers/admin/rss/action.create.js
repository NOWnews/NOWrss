
const debug = require('debug')('NOWrss:controllers:admin:rss:action.create');
const models = require('../../../../models');
const libs = require('../../../../libs');

const co = require('co');

module.exports = (req, res, next) => {

    let data = req.body;

    data.startDate = data.dateRange.split('-')[0].replace(/(^[\s]*)|([\s]*$)/g, '');
    data.endDate = data.dateRange.split('-')[1].replace(/(^[\s]*)|([\s]*$)/g, '');

    debug('data = %j', data);

    // return res.http(204);

    co(function*() {
        var a = {
            name: data.name,
            catogry: data.catogry,
            startDate: data.startDate,
            endDate: data.endDate,
            confirmIP: data.confirmIP || '',
            contactPerson: data.contactPerson
        };
        console.log(a);
        let vv = yield models.rss.createAsync(a);
        console.log(vv);

        return res.redirect('/admin/rss');
        // return res.http(204);
    })
    .catch(next);
};
