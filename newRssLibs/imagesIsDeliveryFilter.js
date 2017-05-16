const debug = require('debug')('NOWrss:newRssLibs:imagesIsDeliveryFilter');
const cheerio = require('cheerio');
const _ = require('lodash');
module.exports = async(allNews) => {

    return _.map(allNews,(news) => {

        try{
            //主圖
            if(news.MainPhoto && news.MainPhoto.isDeliver===false){
                delete news.MainPhoto;
            }

            //內容圖
            
            let $ = cheerio.load( news.content , { decodeEntities: false });

            $('img').filter(function(i, el) {
                if($(el).data('isdeliver')===false){
                    $(el).closest('p').remove();
                } 
            });

            news.content = $.html();

            debug('new.content',news.content)
            
            return news;

        }catch(err){

            debug(err);

        }
    })

     
    

}