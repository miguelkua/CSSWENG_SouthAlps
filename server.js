const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 3000;

// Initializing the passport
const initializePassport = require('./passport-config.js');
initializePassport(passport);

// enables the use of sessions & user authentication
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "sikret", // TEMPORARY (until dotenv is setup)
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// enables the use of JSON methods
app.use(express.json());

// View engine setup
app.engine('handlebars', exphbs.engine());
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
const quoteRouter = require('./routes/quotes.js');
const adminRouter = require('./routes/admin.js');

app.use(editRouter); //this works
app.use('/quotes', quoteRouter);
app.use('/admin', adminRouter);

//database stuff
mongoose.connect('mongodb://127.0.0.1:27017/SouthAlps_DB')
const db = mongoose.connection

db.on('error', () => console.log("Failed to Connect to Database"))
db.once('open', () => console.log("Successfully Connected to Database"))

// the rest of the pages interacting with each other
const TextEntry = require('./models/textEntry.js');

app.get('/home', async (req, res) => {
    try {
        const data = await TextEntry.find({ page: 'home' }); 
        const textMappings = {};

        data.forEach(entry => {
            textMappings[entry.id] = entry.text; 
        });

        res.render('home', { layout: false, isAdminMode, textMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

  
  
app.get('/facility', async (req, res) => {
    try {
        const data = await TextEntry.find({ page: 'facility' }); 
        const textMappings = {};

        data.forEach(entry => {
            textMappings[entry.id] = entry.text; 
        });

        res.render('facility', { layout: false, isAdminMode, textMappings });
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
        const data = await TextEntry.find({ page: 'index' }); 
        const textMappings = {};

        data.forEach(entry => {
            textMappings[entry.id] = entry.text; 
        });

        res.render('index', { layout: false, isAdminMode, textMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/services', async (req, res) => {
    try {
        const data = await TextEntry.find({ page: 'services' }); 
        const textMappings = {};

        data.forEach(entry => {
            textMappings[entry.id] = entry.text; 
        });

        res.render('services', { layout: false, isAdminMode, textMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/careers', async (req, res) => {
    try {
        const data = await TextEntry.find({ page: 'careers' }); 
        const textMappings = {};

        data.forEach(entry => {
            textMappings[entry.id] = entry.text; 
        });

        res.render('careers', { layout: false, isAdminMode, textMappings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/login', (req, res) => {
//     res.render('login', {layout: false, isAdminMode});
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
