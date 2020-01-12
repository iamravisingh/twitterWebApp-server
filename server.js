const express = require('express');
const app = express();
// const TwitterStrategy = require('passport-twitter').Strategy;
// const twitConfig = require('./config/auth').twitterAuth;
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session      = require('express-session');
const cors = require('cors');
const useroAuth = require('./routes/oAuth')(passport);
const frontend = require('./routes/frontend')(passport);
// const io = require('socket.io')

// Create a new Express application.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// enable cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
  
app.use((req,res,next) => {
    cors(corsOption);
    next();
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true ,cookie: { secure: true }})); // session secret
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
 // session secret
require('./routes/token');
require('./routes/twitterApi')(app);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use('/', frontend); //accessing / will get you to frontend route

// app.use(passport.session({
//     resave: false,
//     saveUninitialized: true
// }));


app.get('/LoggedInUser', function (req, res,next) {
    console.log('user in />>>>>>>>>>>>>>', global.twitterUser);
    res.send(global.twitterUser)
    next();
})

// app.get('/twitter/login', passport.authenticate('twitter'));

// app.get('/twitter/return', passport.authenticate('twitter', { successRedirect : 'http://localhost:8080/home',failureRedirect: '/twitter/login' }),(req, res,next) => {
//     console.log('inside the return failure');
//     res.send('http://localhost:8080/home');
//     next();
// })



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors);
// load the routes 


// listen for requests :)
const listener = app.listen(process.env.PORT || 8010, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});

const io = require('socket.io')(listener);
io.on('connection', client => {
    console.log('a user connected');
    client.on('register', handleRegister)

    client.on('join', handleJoin)

    client.on('leave', handleLeave)

    client.on('message', handleMessage)

    client.on('chatrooms', handleGetChatrooms)

    client.on('availableUsers', handleGetAvailableUsers)

    client.on('disconnect', function () {
        console.log('client disconnect...', client.id)
        handleDisconnect()
    })

    client.on('error', function (err) {
        console.log('received error from client:', client.id)
        console.log(err)
    })

}) 