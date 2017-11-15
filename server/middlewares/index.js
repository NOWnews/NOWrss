import express from 'express';
import compression from 'compression';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import cookieSession from 'cookie-session';
import nunjucks from 'nunjucks';
import methodOverride from 'method-override';
import defaultUser from './defaultUser';
import filterForXml from './filterForXml';

const upload = multer({
    dest: '/tmp'
});

module.exports = (app) => {

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(cors());
    app.use(upload.single('file'));

    // express session setting
    app.set('trust proxy', 1);
    app.use(cookieSession({
        name: 'rss',
        keys: ['NOWrss', 'rss']
    }));

    // view engine 設定與 views 擺放位置設定
    app.set('view engine', 'html');
    nunjucks.configure('server/views', {
        autoescape: true,
        express: app,
        watch: true
    });

    // 靜態檔案位置
    app.use('/static', express.static(rootPath + '/server/public/'));

    // overwrite put and delete method
    app.use(methodOverride((req, res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

     app.use(logger('dev'));

     app.use(defaultUser());
     app.use(filterForXml);

    return (req, res, next) => next();

};
