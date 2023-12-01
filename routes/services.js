const express = require('express');
const router = express.Router();
const controller = require('../database/controller.js');
const { collection } = require('../database/schemas/admin.js');


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

router.post('/add', async function(req,res)
{
    try
    {
        let service = {
            name: req.body.name,
            description: req.body.description
        }
        await controller.addDocument('services', service);
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
        const serviceId = req.body._id;

        await controller.deleteDocumentByID('services', serviceId);

        res.sendStatus(200);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;