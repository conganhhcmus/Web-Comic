const express = require('express');

// import models
//var Home = require('../models/bookinstance');

exports.login = function(req, res){
    res.render("pages/login",{
        layout: 'index'
        // some variables
    })
};