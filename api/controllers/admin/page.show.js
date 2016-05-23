

const debug = require('debug')('NOWrss:controllers:admin:page.show');
const models = require('../../../models');
const libs = require('../../../libs');

module.exports = (req, res, next) => {

    let aaa = {
        name: 'Yahoo台灣新聞頻道',
        type: 'rss',
        expiry: new Date('2016-05-23')
    };
    models.rss.createAsync(
        aaa
    );
    return res.render('admin/show');
};
