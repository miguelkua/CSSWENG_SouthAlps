const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require('multer'); // for the image URLs
const fs = require('fs'); // files
const controller = require('../database/controller.js');
const Careers = require('../database/schemas/careers.js');
const Facilities = require('../database/schemas/facilities.js');

router.post('/addCar', async (req, res) => {
    const { jobTitle, jobDesc } = req.body;
    console.log('Request Data:', { jobTitle, jobDesc });

    try {
        let career = {
            jobtitle: jobTitle,
            jobdesc: jobDesc
        };

        await controller.addDocument('careers', career);
        console.log('Entry Submitted Successfully.');
        res.json({ message: 'Entry submission successful' });
    } catch (error) {
        console.error('Error submitting entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/delCar', async (req, res) => {
    const { elementID } = req.body;
    console.log('Request Data:', { elementID });

    try {
        const existingEntry = await Careers.findOne({ _id: elementID });
        
        if (!existingEntry) {
            return res.status(404).json({ error: `Entry with ID ${elementID} not found` });
        }

        await existingEntry.deleteOne();

        res.json({ message: 'Entry deletion successful' });
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const fac_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/facilities'); // directory where the images will be stored
    },
    filename: function (req, file, cb) {
      const originalFilename = file.originalname;
      cb(null, originalFilename); // names the image after the inputted image name
    }
});
  
const add = multer({ storage: fac_storage });

router.post('/addFac', add.single('fac-upload'), async function (req, res) {
    const { updatedContent, facValue} = req.body;
    console.log('Request Data:', { updatedContent, facValue});

    try {
        let facilities = new Facilities({
            imageName: updatedContent,
            facDesc: facValue
        });
    
        if (req.file) {
            console.log('Received Image File:', req.file.originalname);
        } else {
            console.log('No Image File Received');
        }
    
        await controller.addDocument('facilities', facilities);

        console.log('Entry Submitted Successfully.');
        res.json({ message: 'Entry submission successful' });
    } catch (error) {
        console.error('Error submitting entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/delFac', async (req, res) => {
    const { elementID } = req.body;
    console.log('Request Data:', { elementID });

    try {
        const existingEntry = await Facilities.findOne({ _id: elementID });
        
        if (!existingEntry) {
            return res.status(404).json({ error: `Entry with ID ${elementID} not found` });
        }

        await existingEntry.deleteOne();

        res.json({ message: 'Entry deletion successful' });
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router