const express = require('express');
const router = express.Router();

// Require controller modules.
const home_controller = require('./../controllers/home.C');
const user_controller = require('./../controllers/user.C');
const comic_controller = require('./../controllers/comic.C');


/// HOME ROUTES ///

// // GET home page.
// router.get('/', home_controller.index);

// // GET home page.
router.get('/', home_controller.index);

// GET fag page
router.get('/faq', home_controller.faq);

// GET fag page
router.get('/about', home_controller.about);

/// ACCOUNT ROUTES ///

// GET login page.

router.get('/login', user_controller.login);


/// COMIC ROUTES ///

// // GET view comic page.
// router.get('/comic_detail/:idComic',comic_controller.viewComic);


module.exports = router;