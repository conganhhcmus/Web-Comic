const express = require('express');
const router = express.Router();

// Require controller modules.
const home_controller = require('./../controllers/home.C');
const user_controller = require('./../controllers/user.C');
const comic_controller = require('./../controllers/comic.C');

router.get('/:idComic', comic_controller.viewComic);


module.exports = router;