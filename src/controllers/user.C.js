// import firebase
const firebase = require('./../../config/firebaseConfig');
const passport = require('passport');
// import models
//const accountM = require('./../models/account.M');

exports.sign_out = function (req, res) {
    //to do something
    firebase.auth().signOut()
        .catch(function (error) {
            return error;
        });

    req.logout();
    res.redirect('/');
};

exports.sign_up = function (req, res, next) {
    //to do something
    const user = {
        email: req.body.username,
        password: req.body.password,
        confirm: req.body.confirm,
        displayName: req.body.name
    }

    // email null
    if (user.email === "") {
        res.render("pages/sign_up", {
            layout: 'index',
            error: "Email is empty !"
            // some variables
        })
        return;
    }
    // pass null
    if (user.password === "") {
        res.render("pages/sign_up", {
            layout: 'index',
            error: "Password is empty !"
            // some variables
        })
        return;
    }
    //pass != confirm
    if (user.password !== user.confirm) {
        res.render("pages/sign_up", {
            layout: 'index',
            error: "Password mismatched !"
            // some variables
        })
        return;
    }
    //pass.length<6
    if (user.password.length < 6) {
        res.render("pages/sign_up", {
            layout: 'index',
            error: "Password have more 6 characters !"
            // some variables
        })
        return;
    }
    // create account
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function () {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.render('pages/sign_up', {
                        layout: 'index',
                        error: 'Create new account error ! Pls create again !',
                    });
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        })
        .catch(function () {
            return res.render("pages/sign_up", {
                layout: 'index',
                error: "Create new account error ! Pls create again !"
                // some variables
            })
            
        });
};

exports.sign_in = function (req, res, next) {
    //to do something
    const user = {
        email: req.body.username,
        password: req.body.password
    }

    // email null
    if (user.email === "") {
        res.render("pages/sign_in", {
            layout: 'index',
            error: "Email is empty !"
            // some variables
        })
        return;
    }
    // pass null
    if (user.password === "") {
        res.render("pages/sign_in", {
            layout: 'index',
            error: "Password is empty !"
            // some variables
        })
        return;
    }
    //pass.length<6
    if (user.password.length < 6) {
        res.render("pages/sign_in", {
            layout: 'index',
            error: "Password have more 6 characters !"
            // some variables
        })
        return;
    }
    
    //sign in with passport
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('pages/sign_in', {
                layout: 'index',
                error: 'Email or Password is incorrect !',
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.sign_in_fb = function (req, res) {
    //to do something
    res.redirect('/');
};

exports.sign_in_gg = function (req, res) {
    //to do something
    res.redirect('/');
};