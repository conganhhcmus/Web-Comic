const express = require('express');
const firebaseM = require("../models/comic.M");

// import models
//var Home = require('../models/bookinstance');

exports.index = async function (req, res) {
    let comic = await firebaseM.get10NewComic();
    res.render("pages/home", {
        layout: 'index',
        // some variables
        newComicL: comic,

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