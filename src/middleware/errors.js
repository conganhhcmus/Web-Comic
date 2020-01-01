const createErr = require('http-errors');

module.exports = app => {
    app.use((req, res, next) => {
        next(createErr(404));
    });

    app.use((err, req, res, next) => {
        let status = err.status || 500;

        if (status === 404) {
            res.render(`errors/${status}`, {
                layout: 'index'
            });
        }

        if (status === 500) {
            res.render(`errors/${status}`, {
                layout: false
            });
        }
        // do something
        
    });

}