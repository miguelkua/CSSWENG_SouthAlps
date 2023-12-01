const express = require('express');
const router = express.Router();
const controller = require('../database/controller.js');


router.get('/', async (req, res) => 
{
    try 
    {
        const textData = await controller.getText('facility'); 
        const imageData = await controller.getImages('facility');
        const facilities = await controller.getAll('facilities'); 
        const accreditations = await controller.getAll('accreditations');

        const textMappings = {};
        const imageMappings = {};

        const isAdminMode = req.user ?? false;

        textData.forEach(entry => 
        {
            textMappings[entry.id] = entry.text;
        });

        imageData.forEach(entry => 
        {
            imageMappings[entry.id] = entry.imageName;
        });

        res.render('facility', 
        { 
          layout: false, 
          isAdminMode: (isAdminMode? req.user.username : false), 
          textMappings, 
          imageMappings,
          facilities: facilities,
          accreditations: accreditations
        });
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;