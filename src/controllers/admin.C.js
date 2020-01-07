const express = require('express');
const firebaseM = require("../models/comic.M");
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');

const storage = new Storage({
    projectId: "comic-web-bc8e5",
    keyFilename: "../models/serviceAccountKey.json"
});


const bucket = storage.bucket("comic-web-bc8e5.appspot.com");

const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);


        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            resolve(url);
        });
        blobStream.end(file.buffer);
    });
}
exports.newComic1 = async function (req, res) {
    console.log(req.body.name)
    console.log(req.files)
    file = req.files[0]
    //const id = req.query.id
        if (file) {
        uploadImageToStorage(file).then((success) => {
            res.status(200).send({
                status: 'success'
            });
        }).catch((error) => {
            console.error(error);
        });
    }
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
