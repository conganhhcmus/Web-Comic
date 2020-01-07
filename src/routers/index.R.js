const express = require('express');
const multer = require("multer");
const router = express.Router();

// Require controller modules.
router.get('/', function(req,res,next){
    res.redirect('/home')
})

module.exports = router;