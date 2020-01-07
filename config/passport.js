const TwitterStrategy = require('passport-twitter').Strategy;
const twitConfig = require('../config/auth').twitterAuth;

const passport = () => {
    console.log('inside passport >>>>>>>>>>>>>>>>>')
    const token = twitConfig.accessKey;
    const tokenSecret = twitConfig.accessSecretKey
    passport.use(new Strategy({
        consumerKey: twitConfig.consumerKey,
        consumerSecret: twitConfig.consumerSecret,
        callbackURL: twitConfig.callbackURL
        },
        function(token, tokenSecret, profile, cb) {
          // In this example, the user's Twitter profile is supplied as the user
          // record.  In a production-quality application, the Twitter profile should
          // be associated with a user record in the application's database, which
          // allows for account linking and authentication with other identity
          // providers.
            console.log('profile data inside the passport>>>>>>>>>>>>>>>>',profile,cb)
          return cb(null, profile);
        }));
    
    passport.serializeUser(function(user, cb) {
            cb(null, user);
          });
          
    passport.deserializeUser(function (obj, cb) {
        cb(null, obj)
    })
}

module.exports = passport;