const express = require('express');
const router = express.Router();
const Services = require('../database/schemas/services');

router.get('/', async (req, res) =>
{
  const services = await Services.find({}).exec();
  var isAdminMode = req.user ?? 'none';

  res.render('services', 
  {
      layout: false, 
      isAdminMode: (isAdminMode == 'none'),
      services: services
  });
});

module.exports = router;