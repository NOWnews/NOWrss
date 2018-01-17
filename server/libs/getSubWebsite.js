

const debug = require('debug')('NOWrss:libs:getSubWebsite');

/*
 * 撈取子頻道的 feedFrom
 */

module.exports = () => {
    return [
        {
            name: 'BOBEENOW',
            title: '保庇'
        },{
            name: 'IFUNNOW',
            title: 'iFun NOW'
        },{
            name: 'PETSMAO',
            title: '寵毛網'
        },{
            name: 'PINKNOW',
            title: '粉樂鬧'
        },{
            name: 'PLAYNOW',
            title: 'Play NOW'
        },{
            name: 'SIGHT',
            title: '今日觀點'
        },{
            name: 'SPORTNOW',
            title: 'Sport NOW'
        }
    ];
};
