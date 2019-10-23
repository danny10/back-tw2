var mongoose = require('mongoose');
var User = mongoose.model('User');
var TwitterStrategy = require('passport-twitter').Strategy;

// Configuration file where the API keys are located
var config = require('./config');

// Export passport functions as a module
module.exports = function(passport) {

    // Save the session with the serialized user
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Deserialize the user to use it
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    // Authentication settings with Twitter
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.key,
        consumerSecret: config.twitter.secret,
        callbackURL: '/auth/twitter/callback'
    }, (accessToken, refreshToken, profile, done) => {

        //console.log(profile);

        // Check if the user is already authenticated
        User.findOne({ provider_id: profile.id }, (err, user) => {

            //console.log(profile);
            if (err) throw (err);

            // Returns the user if it already exists
            if (!err && user != null) return done(null, user);

            // Create a new user
            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                username: profile.username,
                photo: profile.photos[0].value,
                createdAt: new Date() //mirar que esta colocando otra fecha
            });

            
            //Save a new user
            user.save(function(err) {
                if (err) throw err;
                done(null, user);
                console.log(user);
                // res.status(201).json({
                //     ok: true,
                //     user: user
                // });
            });

        });

    }));
};