const createErr = require('http-errors');
const accountM = require('./../models/account.M');

module.exports = app => {
    app.use((req, res, next) => {
        next(createErr(404));
    });

    app.use(async(err, req, res, next) => {
        const user = req.user;
        let inf = null
        if (user) {
            inf = await accountM.getInf(user.uid);
            res.redirect("/");
            return;
        }
        let status = err.status || 500;

        if (status === 404) {
            res.render(`errors/${status}`, {
                layout: 'index',
                user: user,
                inf: inf
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