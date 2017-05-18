const debug = require('debug')('NOWrss:utils:dateFormat');
const moment = require('moment-timezone');

module.exports = (dateTime, formatString) => {

	formatString = formatString ? formatString : 'YYYY/MM/DD';
    return moment(dateTime).tz('Asia/Taipei').format(formatString);
};
