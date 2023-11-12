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
const Admins = require('./database/schemas/admin.js');
initializePassport(
    passport,
    name => { return Admins.findOne({username: name}) },
    id => { return Admins.findOne({_id: id}) }
);

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
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.engine('handlebars', exphbs.engine({
    helpers: require('./views/handlebars-helper.js').helpers,
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

// Using a main router to create smaller routes to different endpoints
const router = require('./routes/router.js');
app.use('/', router);

//database stuff
mongoose.connect('mongodb://127.0.0.1:27017/SouthAlps_DB');
const db = mongoose.connection;

db.on('error', () => console.log("Failed to Connect to Database"));
db.once('open', () => console.log("Successfully Connected to Database"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
