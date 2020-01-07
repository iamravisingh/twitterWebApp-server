const express = require('express')
const app = express();
const constant = require('../config/constant');
const twitConfig = require('../config/auth').twitterAuth;
const twit = require('twit');
const T = new twit(twitConfig);

app.get('/verify_credentials', function (request, response) {
    T.get('account/verify_credentials',{ include_entities: false, skip_status: true, include_email: false }, 
        (err,res) => {
            console.log('arguments in onAuhtentica >>>>>>>>>>>>',err,res)
            if (err) {
                return response.status(400).send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.status(200).send(res);
        })
    // res.render('index', {user: req.user})
})

app.get('/user_timeline/:screen_name', function (request, response) {
    const screen_name = request.params.screen_name;
    console.log('screen_name>>>>>>>>>', screen_name);
    T.get('statuses/user_timeline',{ screen_name }, 
        (err,res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>',err,res)
            if (err) {
                return response.status(400).send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.status(200).send(res);
        })
})

app.get('/home_timeline', function (request, response) {
    console.log('screen_name>>>>>>>>>', screen_name);
    T.get('statuses/home_timeline',{},(err,res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>',err,res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
})

app.post('/statusUpdate', function (request, response) {
    console.log('statuses/update>>>>>>>>>>>>', request.body)
    T.post('statuses/update',request.body,(err,res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>',err,res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
})

app.post('/access_token', (request, response) => {
    // console.log('access_token >>>>>>>>>>>>', request)
    const access_tokenPayload = {
        oauth_token : request.query.oauth_token,
        oauth_verifier :  request.query.oauth_verifier
    }
    console.log('access_tokenPayload>>>>>>>>>>>', access_tokenPayload);
    T.post(`oauth/access_token?${access_tokenPayload.oauth_token}&${access_tokenPayload.oauth_verifier}`,{},(err,res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>',err,res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
})

app.post('/newMessage', (request, response) => {
    // console.log('access_token >>>>>>>>>>>>', request)
    const payload = {
        screen_name : request.body.screen_name,
        text :  request.body.text
    }

    console.log('access_tokenPayload>>>>>>>>>>>', payload);
    T.post(`/direct_messages/new`,payload,(err,res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>',err,res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
})


app.post('/reTweet', (request, response) => {
    // console.log('access_token >>>>>>>>>>>>', request)
    const payload = {
        id : request.body.tweet_id,
    }

    console.log('access_tokenPayload>>>>>>>>>>>', payload);
    T.post(`/statuses/retweet/:id`,payload,(err,res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>',err,res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
})

module.exports = app