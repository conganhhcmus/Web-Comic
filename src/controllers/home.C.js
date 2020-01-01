const express = require('express');

// import models
//var Home = require('../models/bookinstance');

exports.index = function (req, res) {
    res.render("pages/home", {
        layout: 'index',
        // some variables
        card: [
            {
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