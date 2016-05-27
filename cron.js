const schedule = require('node-schedule');
const Promise = require('bluebird');
const co = require('co');

let uploadXml = require('./line/uploadXml');

co(function*() {
    return yield new Promise(function(resolve, reject) {
        let uploadXmlJob = schedule.scheduleJob('*/30 * * * * *', function(){
            uploadXml();
        });
    });
})
.catch(function(err) {
    console.log(err);
    return process.exit();
});