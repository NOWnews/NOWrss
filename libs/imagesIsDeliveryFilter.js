const cheerio = require('cheerio');

module.exports = async(allNews) => {

    return allNews.map((news) => {
            //主圖
            if(news.MainPhoto.isDeliver===false){
                delete news.MainPhoto.isDeliver;
            }
            //內容圖
            
            return news;
        })

}