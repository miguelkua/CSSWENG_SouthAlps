const express = require('express');
const passport = require('passport');
const controller = require('../database/controller.js');
const router = express.Router();

router.get('/', checkNotAuthenticated, async (req, res) => 
{
    const accreditations = await controller.getAll('accreditations');

    res.render('login', 
    {
        layout: false,
        accreditations: accreditations
    });
});

router.post('/', checkNotAuthenticated, passport.authenticate('local', 
{
    successRedirect: '/home',
    failureRedirect: '/admin',
    failureFlash: false
}));

// Middleware for checking User authentication
function checkAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

function checkNotAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) { return res.redirect('/home'); }
    next();
}


module.exports = router