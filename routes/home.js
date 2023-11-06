const express = require('express');
const router = express.Router();
const Contacts = require('../models/contactinfo.js');


router.get('/', async (req, res) =>
{
    const contacts = await Contacts.find({}).exec();
    var isAdminMode = req.user ?? false;
    console.log(contacts);

    res.render('home', 
    {
        layout: false, 
        isAdminMode: (isAdminMode? req.user.username : false),
        contacts: contacts
    });
});


module.exports = router;