const express = require('express');
const multer = require("multer");
const router = express.Router();

// Require controller modules.
const admin_controller = require('./../controllers/admin.C');

router.get('/admin', admin_controller.newComic);
router.post('/admin', multer().array('chapterNewImg',50) , admin_controller.newComic1);


module.exports = router;