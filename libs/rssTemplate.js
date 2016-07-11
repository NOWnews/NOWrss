
let RSS = require('rss');
let _ = require('lodash');

module.exports = function(feedOptions, feedItem) {
    let feedFields = [
        'title',
        'image',
        'image_url',
        'image_title',
        'image_link',
        'link',
        'language',
        'pubDate',
        'decsription',
        'copyright',
        'ttl'
    ];

    let feedItemFields = [
        'title',
        'link',
        'pubDate',
        'decsription',
        'summary',
        'pubDate',
        'guid',
        'subcategory'
    ];


    let feed = new RSS({
        title: feedOptions.title,
        image_url: 'http://imgapi.nownews.com/?w=640&q=60&src=' + feedOptions.image_url,
        link: feedOptions.link,
        language: feedOptions.language,
        pubDate: feedOptions.pubDate,
        description: feedOptions.description,
        copyright: feedOptions.copyright,
        ttl: feedOptions.ttl
    });

    _.forEach( feedItem, (value) => {
        feed.item(value);
    });

    return feed.xml();

};
