// var Twitter = require('twitter');
const TwitterStrategy = require('passport-twitter').Strategy;
const twitConfig = require('../config/auth').twitterAuth;
const passport = require('passport');
const express = require('express');
const app = express();

module.exports = (passport) => {
    passport.use(new TwitterStrategy({
        profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)'],
        consumerKey: twitConfig.consumer_key,
        consumerSecret: twitConfig.consumer_secret,
        callbackURL: twitConfig.callbackURL
    }, (token, tokenSecret, profile, callback) => {
        // console.log('arguments in passport.use>>>>>>>>>>>>>>>', arguments);
        // console.log('profile in twitterStrategy>>>>>>>>>>>>>', profile, callback);
        // console.log('inside the else condition no error found>>>>>>>>>>', profile);
        global.twitterUser = profile;
        console.log('global.twitterUser>>>>>>>>>>>>>>>>>>',global.twitterUser)
        return callback(null,profile)
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