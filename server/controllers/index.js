import rssFacebookGet from './rssFacebookGet';
import admin from './admin';
import rssGet from './rssGet';

import { Image } from '../models';
import proxy from 'express-http-proxy';

module.exports = (app) => {

    app.use('/', rssGet);
    app.use('/', rssFacebookGet);
    app.use('/', admin);
    app.use('/images/:id', proxy('img.nownews.com', {
        proxyReqPathResolver: async (req, res) => {
            let image = await Image.findBySn(req.params.id).execAsync();
            return image.url;
        },
        https: true,
    }));

    return (req, res, next) => next();
};
