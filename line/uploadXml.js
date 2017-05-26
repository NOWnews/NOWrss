/*
 * 上傳 xml 到 ftp server
 */

const debug = require('debug')('NOWrss:line:uploadXml');
const co = require('co');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const PromiseFtp = require('promise-ftp');
// const fs = require('fs');
const fs = require('fs-extra-promise');
const _ = require('lodash');

const getNewsFromMongo = require('./getNewsFromMongo');
// const getNewsTaxonomyTerm = require('./getNewsTaxonomyTerm');
const buildXmlFromNews = require('./buildXmlFromNews');

module.exports = co.wrap(function*() {

    if(fs.existsSync('./article.xml')){
        console.log('prepare: 刪除未刪除成功的 article.xml');
        fs.removeSync('./article.xml');
    }

    if(fs.existsSync('./line/newsImages/')){
        console.log('prepare: 未刪除成功 imgs 資料夾');
        fs.removeSync('./line/newsImages');
    }

    // 開始時間為 15 分鐘前
    let startTime = moment(Date.now()).add(-15, 'm');
    // let startTime = moment(Date.now()).add(-30, 'm');
    let endTime = moment(Date.now());
    let folderName = '/batch_' + moment(endTime).format('YYYYMMDDHHmm');

    console.log('start = ' + moment(startTime).format('YYYY/MM/DD HH:mm:ss'));
    console.log('end = ' + moment(endTime).format('YYYY/MM/DD HH:mm:ss'));
    // debug('start = %s', moment(startTime).format('YYYY/MM/DD HH:mm:ss'));
    // debug('end = %s', moment(endTime).format('YYYY/MM/DD HH:mm:ss'));

    // 取得所有新聞資料
    let news = yield getNewsFromMongo(startTime, endTime);
    // debug('news = %j', news);

    if(!news || news.length === 0) {
        console.log('沒有新聞可以送出了');
        // debug('沒有新聞可以送出了喔');
        return yield Promise.resolve({});
    }

    let foo = yield buildXmlFromNews(news);

    // console.log(foo);

    fs.writeFileSync('article.xml', foo);
    // debug('foo = %s', 'xml done');

    let ftp = new PromiseFtp();
    yield ftp.connect({
            // host: 'gln-ftps.line-beta.me',
            // user: 'nownews',
            // password: 'changedPassword',
            // port: 20021,
            host: 'ftps-today.line.me',
            user: 'nownews',
            password: 'AS#tH95t',
            port: 20021,
            secure: true,
            secureOptions: {
                // secureProtocol: 'TLSv1_2_method',
                secureProtocol: 'TLSv1_method',
                rejectUnauthorized: false,
                keepalive: 300000
            }
        })
        .then(function() {
            console.log('創建 batch 資料夾');
            return ftp.mkdir(folderName);
        })
        .then(function() {
            console.log('創建 imgs 資料夾');
            return ftp.mkdir(folderName + '/imgs');
        })
        .then(function() {
            console.log('上傳圖片');
            if(!fs.existsSync('./line/newsImages/')) {
                console.log('沒有圖片可以上傳');
                return Promise.resolve({});
            }
            let filesName = fs.readdirSync('./line/newsImages/');
            return Promise.map(filesName, function(fileName) {
                let imageBuffer = fs.readFileSync('./line/newsImages/' + fileName);
                return ftp.put(imageBuffer, '/' + folderName + '/imgs/' + fileName);
            });
        })
        .then(function() {
            console.log('刪除圖片');
            if(!fs.existsSync('./line/newsImages/')) {
                console.log('沒有圖片可以刪除');
                return Promise.resolve({});
            }
            fs.removeSync('./line/newsImages');
            return Promise.resolve({});
        })
        .then(function () {
            console.log('上傳 xml');
            let filesName = fs.readFileSync('./article.xml');
            return ftp.put(filesName, '/' + folderName + '/article.xml');
        })
        .then(function () {
            console.log('上傳 xml finished');
            let filesName = fs.readFileSync('./article.xml.finished');
            return ftp.put(filesName, '/' + folderName + '/article.xml.finished');
        })
        .then(function() {
            console.log('刪除 xml');
            fs.removeSync('./article.xml');
            return Promise.resolve({});
        })
        .then(function () {
            console.log('成功');
            // debug('upload finished');
            // return ftp.end();
            return ftp.destroy();
        })
        .catch(function(err) {
            console.log(err);
            return ftp.destroy();
        });
});