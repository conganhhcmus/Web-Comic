const express = require('express');
const router = express.Router();

// Require controller modules.
const comic_controller = require('./../controllers/comic.C');

router.get('/comic', comic_controller.searchFulltext);


module.exports = router;