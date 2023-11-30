const express = require('express');
const router = express.Router();
const controller = require('../database/controller.js');
const path = require("path");
const fs = require('fs'); // files
const multer = require('multer'); // for the image URLs

//needed multer stuff
const career_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets'); // directory where the images will be stored
    },
    filename: function (req, file, cb) {
      const originalFilename = file.originalname;
      cb(null, originalFilename); // names the image after the inputted image name
    }
});

const add = multer({storage: career_storage});

router.get('/', async (req, res) => 
{
    try 
    {
        const textData = await controller.getText('careers'); 
        const imageData = await controller.getImages('careers');
        const careers = await controller.getAll('careers');
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
            careers: careers,
            accreditations: accreditations
        });
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', add.single('career-upload'), async function(req,res)
{
    try
    {
        let career = {
            name: req.body.name,
            imageName: req.body.imageName? req.file.filename : 'default-image.jpg', // Set imageName to the uploaded file name or a default value
            // imageName: req.body.imageName [NOT WORKING YET]
        }
        await controller.addDocument('careers', career);
        res.sendStatus(200);
    }
    catch(error)
    {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const careerId = req.body._id;

        await controller.deleteDocumentByID('careers', careerId);

        res.sendStatus(200);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;