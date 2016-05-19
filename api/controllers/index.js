let demo = require('./test');
let qoo = require('./qoo');

module.exports = (app) => {

    app.use('/test', demo);
    app.use('/qoo', qoo);
    app.use('/', (req, res, next) => {
        res.send('<h1>Hello World!</h1>');
    });

    return (req, res, next) => next();
};
