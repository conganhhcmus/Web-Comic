const express = require('express');
const firebaseM = require("../models/comic.M");



exports.viewComic = async function (req, res) {
    const user = req.user
    //const id = req.query.id
    const id = req.params.idComic
    const comic = await firebaseM.getComicByID(id)
    res.render("pages/comic/comic_detail", {
        layout: 'index',
        comicDetail: comic,
        user: user,
    })
}

