const express = require('express');
const router = express.Router();
const services = require('../database/schemas/services')

router.get('/', (req, res) =>
{
    var isAdminMode = req.user ?? 'none';
    res.render('services', 
    {
        layout: false, 
        isAdminMode: (isAdminMode == 'none') 
    });
});

Handlebars.registerHelper('isEven', function(index) {
  return index % 2 === 0;
});

module.exports = router;