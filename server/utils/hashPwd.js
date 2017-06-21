const debug = require('debug')('NOWrss:utils:hasPwd');

const crypto = require('crypto');
const constString = '$nownews@rss.';

module.exports = function(password) {

    let hashString = constString + password;
    return crypto.createHash('md5').update(hashString).digest('hex');
};
