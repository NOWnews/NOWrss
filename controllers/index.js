
import test from './test';
import qoo from './qoo';

module.exports = (app) => {

    app.use('/test', test);
    app.use('/qoo', qoo);

    return (req, res, next) => next();
};
