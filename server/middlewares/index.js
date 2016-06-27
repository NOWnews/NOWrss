const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const cookieSession = require('cookie-session');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const defaultUser = require('./defaultUser');

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
    app.set('views', rootPath + '/views/');
    nunjucks.configure('views', {
        autoescape: true,
        express: app,
        watch: true
    });

    // 靜態檔案位置
    app.use('/static', express.static(rootPath + '/public/'));

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

    return (req, res, next) => next();

};
