// import firebase
const firebase = require('./../../config/firebaseConfig');

// import models
//const accountM = require('./../models/account.M');

exports.sign_out = function (req, res) {
    //to do something

    firebase.auth().signOut()
        .catch(function (error) {
            return error;
        });

    res.redirect('/');
};

exports.sign_up = function (req, res) {
    //to do something
    const user = {
        email: req.body.user,
        password: req.body.pass,
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
        .then(function (firebaseUser){
            res.redirect('/');
            return;
        })
        .catch(function (error) {
            res.render("pages/sign_up", {
                layout: 'index',
                error: "Create new account error ! Pls create again !"
                // some variables
            })
            return;
        });
};

exports.sign_in = function (req, res) {
    //to do something
    const user = {
        email: req.body.user,
        password: req.body.pass
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
    //sign in
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(function (firebaseUser) {
            // success
            res.redirect('/');
            return;
        })
        .catch(function (error) {
            // error
            res.render("pages/sign_in", {
                layout: 'index',
                error: "Email or Password is incorrect !"
                // some variables
            })
            return error;
        });
};

exports.sign_in_fb = function (req, res) {
    //to do something
    res.redirect('/');
};

exports.sign_in_gg = function (req, res) {
    //to do something
    res.redirect('/');
};