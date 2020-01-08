const express = require('express');
const multer = require("multer");
const router = express.Router();

// Require controller modules.
const admin_controller = require('../controllers/admin.C');

router.get('/new_comic', admin_controller.newComic);
router.post('/new_comic', multer().array('chapterNewImg',50) , admin_controller.newComicP);
router.get('/:id/add_chapter', admin_controller.addChapter);
router.post('/:id/add_chapter', admin_controller.addChapterP);
router.get('/:id/edit_comic',admin_controller.editChapter);
router.get('/',admin_controller.listChapter);

module.exports = router;