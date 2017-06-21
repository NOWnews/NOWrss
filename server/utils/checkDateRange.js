const debug = require('debug')('NOWrss:utils:checkDateRange');
const moment = require('moment-timezone');

module.exports = (startDate, endDate) => {

    let today = moment().tz('Asia/Taipei').valueOf();
    let start = moment(startDate).tz('Asia/Taipei').valueOf();
    let end = moment(endDate).add(1, 'day').tz('Asia/Taipei').valueOf();

    if(today >= end || today < start){
        return true;
    }
    return false;
};
