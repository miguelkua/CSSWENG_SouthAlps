const express = require('express');
const router = express.Router();
const controller = require('../database/controller.js');
// const { collection } = require('../database/schemas/admin.js');


router.get('/', async (req, res) => 
{
    try 
    {
        const textData = await controller.getText('services'); 
        const imageData = await controller.getImages('services'); 
        const services = await controller.getAll('services');
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

        res.render('services', 
        { 
            layout: false,
            isAdminMode: (isAdminMode? req.user.username : false),
            textMappings,
            imageMappings,
            services: services,
            accreditations: accreditations
        });
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async function(req, res) {
    const { name, description } = req.body;

    // Input Validation
    if (!name || !description) {
        // Respond with a 400 Bad Request if either field is missing
        return res.status(400).json({ error: 'Both name and description are required.' });
    }
    try {
        let service = { name, description };
        await controller.addDocument('services', service);
        res.sendStatus(200); // OK
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal Server Error
    }
});

router.post('/delete', async (req, res) => {
    try {
        const serviceId = req.body._id;

        await controller.deleteDocumentByID('services', serviceId);

        res.sendStatus(200);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;