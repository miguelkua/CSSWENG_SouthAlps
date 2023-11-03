const express = require('express');
const router = express.Router();
const Contacts = require('../database/schemas/contactinfo.js');

router.get('/', async (req, res) =>
{
  const contacts = await Contacts.find({}).exec();
  var isAdminMode = req.user ?? 'none';

  res.render('contactus', 
  {
      layout: false, 
      isAdminMode: (isAdminMode == 'none'),
      contacts: contacts
  });
});
