const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

// TODO: Find a way to replace this hard-coding
const admin_account = { _id: 0, username: 'admin', password: 'admin' };

function initialize(passport) {
    const authenticateUser = async (username, password, done) => 
    {
        if (username != admin_account.username)
        {
            return done(null, false, { message: 'Username does not exist.' });
        }
        if (password == admin_account.password)
        {
            return done(null, admin_account);
        }
        else
        {
            return done(null, false, { message: 'Password does not match.' });
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'username'
        // passwordField is 'password' by default
    }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((_id, done) => done(null, admin_account));
}

module.exports = initialize