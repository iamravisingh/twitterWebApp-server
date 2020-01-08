const express = require('express');
const TwitterStrategy = require('passport-twitter').Strategy;
const twitConfig = require('./config/auth').twitterAuth;
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./routes/oAuth')(passport);


// Create a new Express application.
const app = express();


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

require('./routes/token');
require('./routes/twitterApi')(app);

app.use(passport.initialize());
app.use(passport.session({
    resave: false,
    saveUninitialized: true
}));


app.get('/', function (req, res,next) {
    console.log('user in />>>>>>>>>>>>>>', req.user);
    res.render('index', { user: req.user })
    next();
})

app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/return', passport.authenticate('twitter', { successRedirect : 'http://localhost:8080/home',failureRedirect: '/twitter/login' }),(req, res,next) => {
    console.log('inside the return failure');
    res.send('http://localhost:8080/home');
    next();
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors);
// load the routes 

// listen for requests :)
const listener = app.listen(process.env.PORT || 9000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });
  