
const debug = require('debug')('NOWrss:libs:getNewsImageFromNodeId');
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');
const md5 = require('md5');
const fs = require('fs');
// const config = require('../config');

// const MongoDB = Promise.promisifyAll(require('mongodb'));
// const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

// const downloadImage = require('./downloadImage');

module.exports = co.wrap(function*(news) {

    if(!news) {
        return Promise.reject(new Error('Need News Data'));
    }

    news.image = {};

    // let db = yield MongoClient.connectAsync(config.newsMongodb);
    let mongodb14 = yield require('../mongodb14');

    let imageNodeId = yield mongodb14.collection('fields_current.relation').findOne({
            _bundle: 'relation_news_image',
            _type: 'relation',
            'endpoints.entity_id': news._id
        })
        .then(function(node) {
            // 防止空的新聞
            if(!node){
                return Promise.resolve(node);
            }
            return Promise.resolve(node.endpoints[1].entity_id);
        });

    if(!imageNodeId) {
        return Promise.resolve(news);
    }

    let imageNode = yield mongodb14.collection('fields_current.node').findOne({
            _bundle: 'media',
            _type: 'node',
            _id: imageNodeId,
            'field_release_status.value': 1,
            'field_auth.value': '1',
            field_media_entity: {
                $exists: true
            }
        });

    if(!imageNode) {
        return Promise.resolve(news);
    }

    // debug('imageNode = %j', imageNode);

    let fid = imageNode.field_media_entity.fid;

    let imageData = yield mongodb14.collection('fields_current.file').findOne({
            _bundle: 'image',
            _type: 'file',
            fid: fid
        }, {
            uri: 1,
            field_file_image_width: 1,
            field_file_image_height: 1
        });
    // debug('imageData = %j', imageData);

    if(!imageData) {
        return Promise.resolve(news);
    }

    // 這段解密的邏輯是從就佔撈的我懶得研究了
    let matches = imageData.uri.match(/^hash:\/\/(.*)\.([a-zA-Z0-9]{3,})$/);
    let ext = matches[2];
    let name = matches[1];
    let hash = md5(name + '.' + ext);
    let imgUrl = 'http://s.nownews.com/' + hash.substr(0, 2) + '/' + hash.substr(2, 2) + '/' + hash + '.' + ext;

    // 下載圖片，帶入 url, 資料夾位置， 檔案名稱
    // let imageInfo = yield downloadImage(imgUrl, __dirname + '/newsImages', hash + '.' + ext);

    news.image.title = imageNode.title;
    news.image.description = imageNode.title;
    news.image.uri = imageData.uri;
    news.image.url = 'http://imgapi.nownews.com/?w=600&q=70&src=' + imgUrl;
    news.image.originalUrl = imgUrl;
    news.image.body = '<div class="main-photo"><img src="http://imgapi.nownews.com/?w=600&q=70&src=' + imgUrl + '" width="320px;" class="editorial" /><cite>' + imageNode.title +'</cite></div>';
    // news.image.fileName = imageInfo.fileName;
    // news.image.thumbnail = 'http://imgapi.nownews.com/?w=640&q=60&src=' + imgUrl;
    // debug('news = %j', news);
    // yield db.closeAsync();

    return Promise.resolve(news);
});
