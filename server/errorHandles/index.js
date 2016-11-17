module.exports = (app) => {

    // 處理 404 頁面
    app.use((req, res, next) => {
        res.status(404);
        return res.render('404');
    });

    // 處理底層的錯誤
    app.use((err, req, res, next) => {

        let errObject = {
            message: err.message,
            stack: err.stack.split('\n')
        };
        console.error(errObject);
        return res.render('503', {
            error: errObject
        });
    });

    return (req, res, next) => {
        return next();
    };

};
