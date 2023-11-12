const express = require('express');
const passport = require('passport');


const router = express.Router();

router.get('/', checkNotAuthenticated, (req, res) => 
{
    res.render('login', {layout: false});
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