const express = require('express');
var request = require("request");
const firebaseM = require("../models/comic.M");
const { Storage } = require('@google-cloud/storage');
const util = require("../utils/utils");
const Multer = require('multer');
const accountM = require('./../models/account.M');
const storage = new Storage({
    projectId: "comic-web-bc8e5",
    keyFilename: `${__dirname}/../models/serviceAccountKey.json`
});


const bucket = storage.bucket("comic-web-bc8e5.appspot.com");

exports.newComicP = async function (req, res) {
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
        if (!inf.admin) {
            return res.redirect('/');
        } 
    } else {
        return res.redirect('/');
    }
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
        time: parseInt(Date.now()),
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
        user: user,
        inf: inf
    })
}

exports.newComic = async function (req, res) {
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
        if (!inf.admin) {
            return res.redirect('/');
        } 
    } else {
        return res.redirect('/');
    }
    res.render("pages/admin/newComic", {
        layout: 'index',
        user: user,
        inf: inf
    })
}

exports.listChapter = async function(req,res){
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
        if (!inf.admin) {
            return res.redirect('/');
        } 
    } else {
        return res.redirect('/');
    }
    let comicL = await firebaseM.get1000NewComic()
    res.render("pages/admin/ListComic",{
        layout: 'index',
        user: user,
        comicL: comicL,
        inf: inf
    })
}
exports.addChapter = async function(req,res){
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
        if (!inf.admin) {
            return res.redirect('/');
        } 
    } else {
        return res.redirect('/');
    }
    const id = req.params.id;
    const comic = await firebaseM.getComicByID(id)
    comic.timeFomart = await util.timeIntToTimeString(comic.time);
    res.render("pages/admin/addChapter",{
        layout: 'index',
        user: user,
        comic:comic,
        inf: inf
    })
}
exports.addChapterP = async function(req,res){
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
        if (!inf.admin) {
            return res.redirect('/');
        } 
    } else {
        return res.redirect('/');
    }
    const id = req.params.id;
    const files = req.files;
    //xu ly luu ảnh và link

    const comic = await firebaseM.getComicByID(id)
    comic.timeFomart = await util.timeIntToTimeString(comic.time);
    res.render("pages/admin/addChapter",{
        layout: 'index',
        user: user,
        comic:comic,
        inf: inf
    })
}
exports.editChapter = async function(req,res){
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
        if (!inf.admin) {
            return res.redirect('/');
        } 
    } else {
        return res.redirect('/');
    }
    res.render("pages/admin/editComic",{
        layout: 'index',
        user: user,
        inf: inf
    })
}
exports.editChapterP = async function(req,res){
    const user = req.user;
    let inf = null
    if(user) {
        inf = await accountM.getInf(user.uid);
        if (!inf.admin) {
            return res.redirect('/');
        } 
    } else {
        return res.redirect('/');
    }
    res.render("pages/admin/editComic",{
        layout: 'index',
        user: user,
        inf: inf
    })
}