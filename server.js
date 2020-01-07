const express = require('express');
const TwitterStrategy = require('passport-twitter').Strategy;
const twitConfig = require('./config/auth').twitterAuth;
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');

// Create a new Express application.
const app = express();
// require('./routes/')(app);
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

//initialize passport strategy for twitter login.
passport.use(new TwitterStrategy({
    consumerKey: twitConfig.consumer_key,
    consumerSecret: twitConfig.consumer_secret,
    callbackURL: twitConfig.callbackURL
}, (token, tokenSecret, profile, done) => {
        console.log('arguments in passport.use>>>>>>>>>>>>>>>', arguments);
        console.log('profile in twitterStrategy>>>>>>>>>>>>>', profile,callback);
        process.nextTick(() => {
            if (err) {
                console.log('err in passport TwitterStrategy>>>>>>>>>>>',err)
                return callback()
            } else {
                console.log('inside the else condition no error found>>>>>>>>>>',profile)
            }

        })
    return done(null, profile);
}));

passport.serializeUser(function(user, callback) {
    console.log('arguments in serializeUser passport.use>>>>>>>>>>>>>>>', arguments);
    callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
    console.log('arguments in deserializeUser passport.use>>>>>>>>>>>>>>>', arguments);
    callback(null, obj);
});

app.use(passport.initialize());
app.use(passport.session({
    resave: false,
    saveUninitialized: true
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//load the routes 
app.use(require('./routes/twitterApi'));
app.use(require('./routes/token'));



app.get('/', function (req, res) {
    console.log('user in />>>>>>>>>>>>>>', req);
    res.render('index', {user: req.user})
})


app.get('/twitter/login', passport.authenticate('twitter'), (req, res) => {
    console.log('consoe.log req>>>>>>>>>>>>>', req);
    console.log('res >>>>>>>>>>',res);
});

app.get('/twitter/return', passport.authenticate('twitter', { successRedirect : 'http://localhost:8080',failureRedirect: '/' }), function (req, res) {
    console.log('inside the return failure');
    res.redirect('http://localhost:8080/');
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 9000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });
  