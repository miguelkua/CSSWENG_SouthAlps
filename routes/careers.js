const express = require('express');
const router = express.Router();
const controller = require('../database/controller.js');


router.get('/', async (req, res) => 
{
    try 
    {
        const textData = await controller.getText('careers'); 
        const imageData = await controller.getImages('careers');
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

        res.render('careers', 
        { 
            layout: false,
            isAdminMode: (isAdminMode? req.user.username : false), 
            textMappings, 
            imageMappings,
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