// import firebase
const firebase = require('./../../config/firebaseConfig');
const express = require('express');
const firebaseM = require("../models/comic.M");

// import models
const account = require('./../models/account.M');


exports.index = async function (req, res) {
    const user = req.user;
    let comic = await firebaseM.get10NewComic();

    // Đoạn này dữ liệu tạm. sẽ thay hàm get10new bằng các hàm tương ứng
    let comicAll = await firebaseM.get10NewComic();
    let comicDay = await firebaseM.get10NewComic();
    let comicWeek = await firebaseM.get10NewComic();
    let comicMonth = await firebaseM.get10NewComic();
    let comicYear = await firebaseM.get10NewComic();

    res.render("pages/home", {
        layout: 'index',
        // some variables
        newComicL: comic,
        allComicL: comicAll,
        topDayComicL: comicDay,
        topWeekComicL: comicWeek,
        topMonthComicL: comicMonth,
        topYearComicL: comicYear,
        user: user,
    })
};

exports.sign_in = function (req, res) {
    const user = req.user;
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
    const user = req.user;
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