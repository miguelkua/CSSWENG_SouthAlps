const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const passport = require("passport");
const session = require("express-session");

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

// enables the use of the models folder
app.use('/models', express.static('models'));

// Defaults to home in the views folder
app.get('/', (req, res) => {
    res.redirect('/home');
});

// partial code
let isAdminMode = true;

// enables the routers exported from './routes'
const quoteRouter = require('./routes/quotes.js');
const adminRouter = require('./routes/admin.js');

app.use('/quotes', quoteRouter);
app.use('/admin', adminRouter);

// the rest of the pages interacting with each other
app.get('/home', (req, res) => {
    res.render('home', {layout: false, isAdminMode});
});

app.get('/facility', (req, res) => {
    res.render('facility', {layout: false, isAdminMode});
});

// app.get('/getQuote', (req, res) => {
//     res.render('getQuote', {layout: false, isAdminMode});
// });

app.get('/index', (req, res) => {
    res.render('index', {layout: false, isAdminMode});
});

app.get('/services', (req, res) => {
    res.render('services', {layout: false, isAdminMode});
});

app.get('/careers', (req, res) => {
    res.render('careers', {layout: false, isAdminMode});
});

// app.get('/login', (req, res) => {
//     res.render('login', {layout: false, isAdminMode});
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
