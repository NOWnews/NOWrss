const debug = require('debug')('NOWrss:libs:dateFormat');
const moment = require('moment-timezone');

module.exports = (dateTime) => {

    return moment(dateTime).tz('Asia/Taipei').format('YYYY/MM/DD');
};
