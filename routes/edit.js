const express = require('express');
const router = express.Router();
const TextEntry = require('../models/textEntry');

router.post('/editText', async (req, res) => {
    const { updatedContent, elementID } = req.body;
    console.log('Request Data:', { updatedContent, elementID });

    try {
        const existingEntry = await TextEntry.findOne({ id: elementID}).exec();

        if (!existingEntry) {
            return res.status(404).json({ error: `Entry with ID ${elementID} not found` });
        }

        existingEntry.text = updatedContent;
        await existingEntry.save();
        console.log('Entry Updated Successfully.');
        res.json({ message: 'Entry update successful' });
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router