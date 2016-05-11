let demo = require('./test');
let qoo = require('./qoo');

module.exports = (app) => {

    app.use('/test', demo);
    app.use('/qoo', qoo);

    return (req, res, next) => next();
};
