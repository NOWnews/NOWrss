const debug = require('debug')('NOWrss:libs:checkDateRange');
const moment = require('moment-timezone');

module.exports = (startDate, endDate) => {
    let start = moment(startDate).tz('Asia/Taipei').valueOf();
    let today = moment().tz('Asia/Taipei').valueOf();
    let end = moment(endDate).add(1, 'day').tz('Asia/Taipei').valueOf();
    if(today >= end || today < start){
        return true;
    }
    return false;
};
