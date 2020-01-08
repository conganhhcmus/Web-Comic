const express = require('express');
const firebaseM = require("../models/comic.M");



exports.viewComic = async function (req, res) {
    const user = req.user
    //const id = req.query.id
    const id = req.params.idComic
    const comic = await firebaseM.getComicByID(id)
    const relatedComicL = await firebaseM.get10ComicByCategory(comic.category[0])
    res.render("pages/comic/comic_detail", {
        layout: 'index',
        comicDetail: comic,
        user: user,
        relatedComicL: relatedComicL,
    })
}
exports.searchFulltext = async function(req,res){
    const user = req.user
    let queryTmp = req.query.search_text;
    let listResult = await firebaseM.searchByText(queryTmp);
    res.render("pages/comic/comic_by_list", {
        layout: 'index',
        //comicResultL: comics,
        user: user,
    })
}

