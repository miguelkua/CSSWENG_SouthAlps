const express = require('express');
const router = express.Router();
const Services = require('../models/services.js');

router.get('/', async (req, res) =>
{
  const services = await Services.find({}).exec();
  var isAdminMode = req.user ?? false;

  res.render('services', 
  {
      layout: false, 
      isAdminMode: (isAdminMode? req.user.username : false),
      services: services
  });
});

router.post('/add', async function(req,res)
{
  try
  {
    let service = new Services({
        name: req.body.name,
        description: req.body.description
    });
    await Services.create(service);
    res.sendStatus(200);
  }
  catch(error)
  {
      console.log(error);
      res.sendStatus(500);
  }
});

module.exports = router;