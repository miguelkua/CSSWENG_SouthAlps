const express = require('express');
const path = require("path");
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// Functions from Packages
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express();
const port = process.env.PORT || 3000;

// Initializing the passport
const initializePassport = require('./passport-config.js');
const Admins = require('./database/schemas/admin.js');
initializePassport(
    passport,
    name => { return Admins.findOne({username: name}) },
    id => { return Admins.findOne({_id: id}) }
);

// enables the use of sessions & user authentication
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "sikret", // TODO: TEMPORARY (until dotenv is setup)
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// enables the use of JSON methods
app.use(express.json());

// View engine setup
app.engine('handlebars', engine({
    helpers: require('./views/handlebars-helpers').helpers,
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // views is the folder name

// enables the use of the assets folder
app.use('/assets', express.static('assets'));
app.use('/assets/icons', express.static('icons'));
app.use('/assets/logo', express.static('logo'));

// enables the use of the css folder
app.use('/css', express.static('css'));

// enables the use of the javascript folder
app.use('/javascript', express.static('javascript'));

// Defaults to home in the views folder
app.get('/', (req, res) => {
    res.redirect('/home');
});

// partial code
let isAdminMode = true;

// enables the routers exported from './routes'
const editRouter = require('./routes/edit.js');
// const homeRouter = require('./routes/home.js');
const quoteRouter = require('./routes/quotes.js');
const adminRouter = require('./routes/admin.js');
const serviceRouter = require('./routes/services.js');

app.use(editRouter); //this works
// app.use('/home', homeRouter);
app.use('/quotes', quoteRouter);
app.use('/admin', adminRouter);
// app.use('/services', serviceRouter);

//database stuff
mongoose.connect('mongodb://127.0.0.1:27017/SouthAlps_DB')
const db = mongoose.connection

db.on('error', () => console.log("Failed to Connect to Database"))
db.once('open', () => console.log("Successfully Connected to Database"))

// the rest of the pages interacting with each other
const TextEntry = require('./models/textEntry.js');
const ImageEntry = require('./models/imageEntry.js');

app.get('/home', async (req, res) => {
    try {
        const textData = await TextEntry.find({ page: 'home' }); 
        const imageData = await ImageEntry.find({ page: 'home' }); 

        const textMappings = {};
        const imageMappings = {};

        textData.forEach(entry => {
            textMappings[entry.id] = entry.text;
        });

        imageData.forEach(entry => {
            imageMappings[entry.id] = entry.imageName;
        });

        res.render('home', { layout: false, isAdminMode, textMappings, imageMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

  
  
app.get('/facility', async (req, res) => {
    try {
        const textData = await TextEntry.find({ page: 'facility' }); 
        const imageData = await ImageEntry.find({ page: 'facility' }); 

        const textMappings = {};
        const imageMappings = {};

        textData.forEach(entry => {
            textMappings[entry.id] = entry.text;
        });

        imageData.forEach(entry => {
            imageMappings[entry.id] = entry.imageName;
        });

        res.render('facility', { layout: false, isAdminMode, textMappings, imageMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/getQuote', (req, res) => {
//     res.render('getQuote', {layout: false, isAdminMode});
// });

app.get('/index', async (req, res) => {
    try {
        const textData = await TextEntry.find({ page: 'index' }); 
        const imageData = await ImageEntry.find({ page: 'index' }); 

        const textMappings = {};
        const imageMappings = {};

        textData.forEach(entry => {
            textMappings[entry.id] = entry.text;
        });

        imageData.forEach(entry => {
            imageMappings[entry.id] = entry.imageName;
        });

        res.render('index', { layout: false, isAdminMode, textMappings, imageMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/services', async (req, res) => {
    try {
        const textData = await TextEntry.find({ page: 'services' }); 
        const imageData = await ImageEntry.find({ page: 'services' }); 

        const textMappings = {};
        const imageMappings = {};

        textData.forEach(entry => {
            textMappings[entry.id] = entry.text;
        });

        imageData.forEach(entry => {
            imageMappings[entry.id] = entry.imageName;
        });

        res.render('services', { layout: false, isAdminMode, textMappings, imageMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/careers', async (req, res) => {
    try {
        const textData = await TextEntry.find({ page: 'careers' }); 
        const imageData = await ImageEntry.find({ page: 'careers' }); 

        const textMappings = {};
        const imageMappings = {};

        textData.forEach(entry => {
            textMappings[entry.id] = entry.text;
        });

        imageData.forEach(entry => {
            imageMappings[entry.id] = entry.imageName;
        });

        res.render('careers', { layout: false, isAdminMode, textMappings, imageMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/login', (req, res) => {
//     res.render('login', {layout: false, isAdminMode});
// });

app.listen(port, () => 
{
    console.log(`Server is running on port ${port}`);
    // TODO: replace the URI with dotenv
    mongoose.connect('mongodb://127.0.0.1:27017/southalps');
    console.log("Connected to database.");
});
