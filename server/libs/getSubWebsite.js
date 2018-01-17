

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
            title: '吃喝玩樂的趣味'
        },{
            name: 'PETSMAO',
            title: '寵毛網'
        },{
            name: 'PINKNOW',
            title: '粉樂鬧'
        },{
            name: 'PLAYNOW',
            title: '各種玩樂進行式'
        },{
            name: 'SIGHT',
            title: '今日觀點'
        },{
            name: 'SPORTNOW',
            title: '運動新聞資訊'
        }
    ];
};
