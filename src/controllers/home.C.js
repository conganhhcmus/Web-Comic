// import firebase
const firebase = require('./../../config/firebaseConfig');

// import models
const account = require('./../models/account.M');

exports.index = function (req, res) {
    const user = firebase.auth().currentUser;
    res.render("pages/home", {
        layout: 'index',
        // some variables
        user: user,
        card: [{
                name: 'Võ luyện đỉnh phong'
            },
            {
                name: 'Toàn chức cao thủ'
            },
            {
                name: 'Siêu năng lập phương'
            },
            {
                name: 'Tôi thăng cấp một mình'
            },
            {
                name: 'Thả vu nữ đó ra'
            },
            {
                name: 'Từ hôm nay ta làm thành chủ'
            }
        ]

    })
};

exports.sign_in = function (req, res) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.redirect("/");
        return;
    }
    res.render("pages/sign_in", {
        layout: 'index'
        // some variables
    })
};

exports.sign_up = function (req, res) {
    const user = firebase.auth().currentUser;
    
    if (user) {
        res.redirect("/");
        return;
    }
    res.render("pages/sign_up", {
        layout: 'index',
        error: false
        // some variables
    })
};

exports.faq = function (req, res) {
    res.render("pages/faq", {
        layout: 'index'
    })
};

exports.about = function (req, res) {
    res.render("pages/about", {
        layout: 'index'
    })
};