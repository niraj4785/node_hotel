// Set up passport with alocal authentication strategy, using a person model for use
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./modules/person');


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // Authentication logic here
    try {
        // console.log('Received credential:', USERNAME, password);
        const user = await person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const isPasswordMatch = user.comparePassword(password)
        if (isPasswordMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Incorrect password' });
        }
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; //export  configured passport