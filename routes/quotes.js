const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const controller = require('../database/controller.js');


router.get('/', async (req, res) => 
{
    try 
    {
        const textData = await controller.getText('getQuote'); 
        const imageData = await controller.getImages('quotes'); 

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

        res.render('quotes', 
        { 
            layout: false,
            textMappings,
            isAdminMode: (isAdminMode? req.user.username : false),
            imageMappings
        });
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
  
router.post('/send', (req, res) =>
{
    var from = req.body.company_email;
    var subject = req.body.select_option;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var contact_number = req.body.contact_number;
    var company_email = req.body.company_email;
    var company_address = req.body.company_address;
    var message = req.body.message;

    var transporter = nodemailer.createTransport(
    {
        service:    'gmail',
        auth:
        {
            user:   'djca4m@gmail.com',
            pass:   'rtre yueh svpe ofau'
        }
    })

    var mail_options = {
        from:   from,
        to:     'djca4m@gmail.com',
        subject: subject,
        text:   format_message(first_name, last_name, 
                               contact_number,
                               company_email,
                               company_address,
                               message)
    }


    transporter.sendMail(mail_options, function (error, info)
    {
        if (error)
        {
            console.log(error);
        }
        else
        {
            console.log("Email Send " + info.response);
        }
        res.redirect('/quotes');
    })
});

module.exports = router

function format_message(first_name, last_name, 
                        contact_number, 
                        company_email, 
                        company_address, 
                        message) 
{
    return "Quote from " + first_name + " " + last_name +
           "\n" + contact_number + 
           "\n" + company_email + 
           "\n" + company_address + 
           "\n\n" + message;
}
