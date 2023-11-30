const express = require('express');
const router = express.Router();


// enables the routers exported from './routes'
const editRouter = require('./edit.js');
const adminRouter = require('./admin.js');
const homeRouter = require('./home.js');
const quoteRouter = require('./quotes.js');
const serviceRouter = require('./services.js');
const facilityRouter = require('./facility.js');
const careerRouter = require('./careers.js');
const acrRouter = require('./accreditations.js');

router.use(acrRouter); 
router.use(editRouter); 
router.use('/admin', adminRouter);
router.use('/home', homeRouter);
router.use('/quotes', quoteRouter);
router.use('/services', serviceRouter);
router.use('/facility', facilityRouter);
router.use('/careers', careerRouter);

module.exports = router;