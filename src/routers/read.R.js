const express = require('express');
const router = express.Router();

// Require controller modules.
const home_controller = require('./../controllers/home.C');
const user_controller = require('./../controllers/user.C');
const comic_controller = require('./../controllers/comic.C');

router.get('/:idComic', comic_controller.viewComic);
router.get('/:idComic/read', comic_controller.readComic);
//router.get('/:idComic/readprevious', comic_controller.readComicPrevious);
//router.get('/:idComic/readnext', comic_controller.readComicNext);
//router.get('/:idComic/read/:select', comic_controller.readComic1)


module.exports = router;