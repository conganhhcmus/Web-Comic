const express = require('express');
const firebaseM = require("../models/comic.M");
const accountM = require('./../models/account.M');

exports.viewComic = async function (req, res) {
    //const id = req.query.id
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
    }

    const id = req.params.idComic
    const comic = await firebaseM.getComicByID(id)
    const relatedComicL = await firebaseM.get10ComicByCategory(comic.category[0])
    res.render("pages/comic/comic_detail", {
        layout: 'index',
        comicDetail: comic,
        user: user,
        relatedComicL: relatedComicL,
        inf: inf
    })
}
exports.searchFulltext = async function (req, res) {
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
    }
    let queryTmp = req.query.search_text;
    let listResult = await firebaseM.searchByText(queryTmp);
    res.render("pages/comic/comic_by_list", {
        layout: 'index',
        //comicResultL: comics,
        user: user,
        inf: inf
    })
}

exports.readComic = async function (req, res) {
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
    }

    const idComic = req.params.idComic;
    let chap = parseInt(req.query.this);
    if (!chap) {
        chap = req.query.select;
        if (!chap) {
            chap = 1;
        }
    }
    currentChap = chap;
    //_ReadComic(idComic,chap);
    const comic = await firebaseM.getComicByID(idComic);
    const chapter = comic.chapter[chap - 1];
    let Chapters = await firebaseM.getChapterByID(chapter);
    //console.log(chapters);
    let numberChap = [];
    let i = 1;

    for (i; i <= comic.totalChap; i++) {

        if (i == chap) {
            numberChap.push({ value: i, isSelect: true });
        }
        else {
            numberChap.push({ value: i });
        }
    }
    res.render('pages/comic/readcomic', { 
        layout: 'index', 
        data: Chapters, 
        chap: numberChap, 
        idComic: idComic, 
        currentChap: chap,
        user: user,
        inf: inf
    })
}
