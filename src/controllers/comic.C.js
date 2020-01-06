const express = require('express');
const firebaseM = require("../models/comic.M");


exports.viewComic = async function (req, res) {
    //const id = req.query.id
    const id = req.params.idComic
    const comic = await firebaseM.getComicByID(id)
    console.log(comic)
    res.render("pages/comic_detail", {
        layout: 'index',
        comicDetail: comic,
    })
}

