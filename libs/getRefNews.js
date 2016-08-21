const debug = require('debug')('NOWrss:libs:getRefNews');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
const moment = require('moment-timezone');
// const config = require('../config');

// const MongoDB = Promise.promisifyAll(require('mongodb'));
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const getNewsImageFromNodeId = require('./getNewsImageFromNodeId');

module.exports = co.wrap(function*(news) {

    // let db = yield MongoClient.connectAsync(config.newsMongodb);
    let mongodb14 = yield require('../mongodb14');

    let refNodeIds = _.map(news.field_news_ref, function(refNews) {
        return refNews.target_id;
    });

    // debug('refNodeIds = %j', refNodeIds);

    // 找出所有推薦新聞
    let refNews = yield mongodb14.collection('fields_current.node').find({
            _bundle: 'news',
            _type: 'node',
            _id: {
                $in : refNodeIds
            }
        }, {
            _id: true,
            title: true,
            field_release_date: true
        }).toArray();

    // 還是要找推薦新聞的相關圖片
    refNews = yield Promise.map(refNews, function(ref){
        return getNewsImageFromNodeId(ref);
    })
    .then(function(refNewsWithImage) {
        return Promise.resolve(refNewsWithImage);
    });

    // debug('refNewsWithImage = %j', refNews);

    // 將推薦新聞組成我們需要的格式
    let newRefNews = _.map(refNews, function(ref) {

        let year = moment(ref.field_release_date.value * 1000).format('YYYY');
        let month = moment(ref.field_release_date.value * 1000).format('MM');
        let date = moment(ref.field_release_date.value * 1000).format('DD');
        // debug('thumbnail = %s', ref.image.thumbnail);
        return {
            title: ref.title,
            url: 'http://www.nownews.com/n/' + year + '/' + month + '/' + date + '/' + ref._id,
            thumbnail: ref.image.thumbnail || 'http://www.nownews.com/assets/images/logo.png'
        };
    });

    // debug('newRefNews = %j', newRefNews);

    news.refNews = newRefNews;
    // yield db.closeAsync();

    // debug('news refNews = %j', news.refNews);

    return yield Promise.resolve(news);
});
