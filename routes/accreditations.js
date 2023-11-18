const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require('multer'); // for the image URLs
const fs = require('fs'); // files
const controller = require('../database/controller.js');
const Accreditations = require('../database/schemas/accreditations.js');

//needed multer stuff
const acr_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/logo'); // directory where the images will be stored
    },
    filename: function (req, file, cb) {
      const originalFilename = file.originalname;
      cb(null, originalFilename); // names the image after the inputted image name
    }
});
  
const add = multer({ storage: acr_storage });

router.post('/addAcr', add.single('acr-upload'), async function (req, res) {
    const { updatedContent} = req.body;
    console.log('Request Data:', { updatedContent });

    try {
        let accreditation = new Accreditations({
            imageName: updatedContent
        });
    
        if (req.file) {
            console.log('Received Image File:', req.file.originalname);
        } else {
            console.log('No Image File Received');
        }
    
        await controller.addDocument('accreditations', accreditation);

        console.log('Entry Submitted Successfully.');
        res.json({ message: 'Entry submission successful' });
    } catch (error) {
        console.error('Error submitting entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/delAcr', async (req, res) => {
    const { elementID } = req.body;
    console.log('Request Data:', { elementID });

    try {
        const existingEntry = await Accreditations.findOne({ _id: elementID });
        
        if (!existingEntry) {
            return res.status(404).json({ error: `Entry with ID ${elementID} not found` });
        }

        await existingEntry.deleteOne();

        // deletes it in the folder
        const deleteImage = existingEntry.imageName;
        fs.unlinkSync(path.join('./assets/logo', deleteImage));

        res.json({ message: 'Entry deletion successful' });
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router