const express = require('express');
var request = require("request");
const firebaseM = require("../models/comic.M");
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const storage = new Storage({
    projectId: "comic-web-bc8e5",
    keyFilename: `${__dirname}/../models/serviceAccountKey.json`
});


const bucket = storage.bucket("comic-web-bc8e5.appspot.com");

exports.newComic1 = async function (req, res) {
    const myFormReq = req.body
    file = req.files[0]
    let Mycomic = {
        name: myFormReq.name,
        category: myFormReq.category,
        author: myFormReq.authorName,
        age: myFormReq.age,
        description: myFormReq.description,
        numberDownloaded: 0,
        numberView: 0,
        totalChap: 0,
    }
    let newFileName = `${Date.now()/16253}${Date.now()}.jpg`;

    let fileUpload = bucket.file(newFileName);
    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    })
    blobStream.on('finish', () =>{
        request({
            url: `https://firebasestorage.googleapis.com/v0/b/comic-web-bc8e5.appspot.com/o/${newFileName}`,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                Mycomic.posterPath = `https://firebasestorage.googleapis.com/v0/b/comic-web-bc8e5.appspot.com/o/${newFileName}?alt=media&token=` + body.downloadTokens;
                firebaseM.addComic(Mycomic)
            }
        })
    })
    blobStream.end(file.buffer);
    res.render("pages/admin/newComic", {
        layout: 'index',
    })
}

exports.newComic = async function (req, res) {
    //const id = req.query.id
    res.render("pages/admin/newComic", {
        layout: 'index',
    })
}
exports.addChapter = async function (req, res) {
    res.render("pages/admin/addChapter.hbs", {
        layout: 'index',
    })
}
