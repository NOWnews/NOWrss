let express = require('express');
let compression = require('compression');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let multer = require('multer');
let cookieSession = require('cookie-session');
let nunjucks = require('nunjucks');
let methodOverride = require('method-override');

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
        express: app
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

    return (req, res, next) => next();

};
