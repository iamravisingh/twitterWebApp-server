// var Twitter = require('twitter');
const TwitterStrategy = require('passport-twitter').Strategy;
const twitConfig = require('../config/auth').twitterAuth;
const passport = require('passport');

module.exports = (passport) => {
    passport.use(new TwitterStrategy({
        profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)'],
        consumerKey: twitConfig.consumer_key,
        consumerSecret: twitConfig.consumer_secret,
        callbackURL: twitConfig.callbackURL
    }, (token, tokenSecret, profile, callback) => {
        console.log('arguments in passport.use>>>>>>>>>>>>>>>', arguments);
        console.log('profile in twitterStrategy>>>>>>>>>>>>>', profile, callback);
        process.nextTick(() => {
            if (err) {
                console.log('err in passport TwitterStrategy>>>>>>>>>>>', err)
                return callback()
            } else {
                console.log('inside the else condition no error found>>>>>>>>>>', profile)
            }
    
        })
        return callback(null, profile);
    }));

    passport.serializeUser(function (user, callback) {
        console.log('arguments in serializeUser passport.use>>>>>>>>>>>>>>>', arguments);
        callback(null, user);
    })
    
    passport.deserializeUser(function (obj, callback) {
        console.log('arguments in deserializeUser passport.use>>>>>>>>>>>>>>>', arguments);
        callback(null, obj);
    });
}