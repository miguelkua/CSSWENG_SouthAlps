const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require('multer'); // for the image URLs
const fs = require('fs'); // files
const controller = require('../database/controller.js');
const TextEntry = require('../database/schemas/textEntry.js');
const ImageEntry = require('../database/schemas/imageEntry.js');

//needed multer stuff
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets'); // directory where the images will be stored
    },
    filename: function (req, file, cb) {
      // if it already has a timestamp, it removes it
      const originalFilename = file.originalname;

      cb(null, originalFilename); // naming the image file with a timestamp 
    }
});
  
const edit = multer({ storage: storage });

router.post('/editText', async (req, res) => {
    const { updatedContent, elementID } = req.body;
    console.log('Request Data:', { updatedContent, elementID });

    try {
        const existingEntry = await controller.findTextByID(elementID);
        
        if (!existingEntry) {
            return res.status(404).json({ error: `Entry with ID ${elementID} not found` });
        }

        existingEntry.text = updatedContent;
        await existingEntry.save();

        // this is for the partial stuff that share the same id, but different page values
        const possibleEntries = await TextEntry.find({ id: elementID });

        if (possibleEntries.length > 1) {
            for (const entry of possibleEntries) {
                entry.text = updatedContent;
                await entry.save();
            }
            console.log('All Entries Updated Successfully.');
        }

        else{
            console.log('Entry Updated Successfully.');
        }

        res.json({ message: 'Entry update successful' });
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/editImage', edit.single('image-upload'), async function (req, res) {
    const { updatedContent, elementID } = req.body;
    console.log('Request Data:', { updatedContent, elementID });

    try {
        const existingEntry = await controller.findImageByID(elementID);

        if (!existingEntry) {
            return res.status(404).json({ error: `Entry with ID ${elementID} not found` });
        }

        if (req.file) {
            console.log('Received Image File:', req.file.originalname);
        } else {
            console.log('No Image File Received');
        }

        const oldImage = existingEntry.imageName
        const possibleEntries = await ImageEntry.find({ imageName: oldImage });
        console.log('Number of Entries:', possibleEntries);

        //only deletes when there a new image name is introduced and that there is only 1 existing entry using it
        if(oldImage != updatedContent && possibleEntries.length == 1){
            console.log('Old Image Name:', oldImage);
            fs.unlinkSync(path.join('./assets', oldImage));
        }

        existingEntry.imageName = updatedContent;
        await existingEntry.save();
        console.log('Entry Updated Successfully.');
        res.json({ message: 'Entry update successful' });
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router