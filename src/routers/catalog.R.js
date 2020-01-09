const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require controller modules.
const home_controller = require('./../controllers/home.C');
const user_controller = require('./../controllers/user.C');
const comic_controller = require('./../controllers/comic.C');


/// HOME ROUTES ///

// // GET home page.
router.get('/', home_controller.index);
// GET fag page
router.get('/faq', home_controller.faq);
// GET fag page
router.get('/about', home_controller.about);
// GET sign_in page.
router.get('/sign_in', home_controller.sign_in);
// GET sign_up
router.get('/sign_up', home_controller.sign_up);

/// ACCOUNT ROUTES ///

// GET sign_out
router.get('/sign_out', user_controller.sign_out);
// POST sign_up
router.post('/sign_up', user_controller.sign_up);
// POST sign_in
router.post('/sign_in', user_controller.sign_in);
// POST sign_in_fb
router.post('/sign_in_fb', user_controller.sign_in_fb);
// POST sign_in_gg
router.post('/sign_in_gg', user_controller.sign_in_gg);


/// COMIC ROUTES ///

// // GET view comic page.
// router.get('/comic_detail/:idComic',comic_controller.viewComic);


/// COMIC ROUTES ///

// // GET view comic page.
// router.get('/comic_detail/:idComic',comic_controller.viewComic);


module.exports = router;