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

router.post('/submit', async function(req,res){
  
  try{
  
  let service = new Services({
      name: req.body.nameInput,
      description: req.body.descriptionInput
  });
      await Services.create(service);
      res.sendStatus(200);
  }catch(error){
      console.log(error);
      res.sendStatus(500);
  }
});

module.exports = router;