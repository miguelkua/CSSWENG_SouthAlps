const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByName, getUserById) {
    const authenticateUser = async (username, password, done) => 
    {
        const user = await getUserByName(username);

        if (user == null)
        {
            return done(null, false, { message: 'Username does not exist.' });
        }

        try 
        {
            if (await bcrypt.compare(password, user.password)) 
            {
                return done(null, user);
            } 
            else 
            {
                return done(null, false, { message: 'Password does not match' });
            }
        } 
        catch (error) 
        {
            return done(error);
        }
    }

    passport.use(new LocalStrategy(
    {
        usernameField: 'username'
        // passwordField is 'password' by default
    }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (_id, done) => 
    { 
        let user_id = await getUserById(_id);
        return done(null, user_id);
    });
}
    
module.exports = initialize