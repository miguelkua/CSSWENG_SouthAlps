const express = require('express');
const router = express.Router();
const Contacts = require('../database/schemas/contactinfo.js');


router.get('/', async (req, res) =>
{
    const contacts = await Contacts.find({}).exec();
    var isAdminMode = req.user ?? 'none';
    console.log(contacts);

    res.render('home', 
    {
        layout: false, 
        isAdminMode: (isAdminMode == 'none'),
        contacts: contacts
    });
});


module.exports = router;