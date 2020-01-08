const express = require('express')
const app = express();
const constant = require('../config/constant');
const twitConfig = require('../config/auth').twitterAuth;
const twit = require('twit');
const T = new twit(twitConfig);

module.exports = (app) => {
    app.get(constant.USER_VERIFY_CREDENTIALS, function (request, response) {
        T.get(constant.TWITTER_VERIFY_CREDENTIALS, {},(err, res) => {
                console.log('arguments in onAuhtentica >>>>>>>>>>>>', err, res)
                if (err) {
                    return response.status(400).send(err);
                }
                console.log('Authentication successful. Running bot...\r\n')
                return response.status(200).send(res);
            })
        // res.render('index', {user: req.user})
    })

app.get(constant.USER_TIMELINE_URL, function (request, response) {
        const screen_name = request.params.screen_name;
        console.log('screen_name>>>>>>>>>', screen_name);
        T.get(constant.TWITTER_USER_TIMELINE, { screen_name },
            (err, res) => {
                console.log('arguments in user_timeline >>>>>>>>>>>>', err, res)
                if (err) {
                    return response.status(400).send(err);
                }
                console.log('Authentication successful. Running bot...\r\n')
                return response.status(200).send(res);
            })
    })

app.get(constant.USER_HOME_TIMELINE_URL, function (request, response) {
        console.log('screen_name>>>>>>>>>', screen_name);
        T.get(constant.TWITTER_HOME_TIMELINE, {}, (err, res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>', err, res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
    })

app.post(constant.USER_TWEET_URL, (request, response)  => {
    console.log('statuses/update>>>>>>>>>>>>', request.body)
        T.post(constant.TWITTER_STATUS_TWEET, request.body, (err, res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>', err, res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
    })

app.post(constant.USER_ACCESS_TOKEN_URL, (request, response) => {
        // console.log('access_token >>>>>>>>>>>>', request)
        const access_tokenPayload = {
            oauth_token: request.query.oauth_token,
            oauth_verifier: request.query.oauth_verifier
        }
        console.log('access_tokenPayload>>>>>>>>>>>', access_tokenPayload);
        T.post(`oauth/access_token?${access_tokenPayload.oauth_token}&${access_tokenPayload.oauth_verifier}`, {}, (err, res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>', err, res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
    })

app.post(constant.USER_DIRECT_MSG_URL, (request, response) => {
        // console.log('access_token >>>>>>>>>>>>', request)
        const payload = {
            screen_name: request.body.screen_name,
            text: request.body.text
        }

        console.log('access_tokenPayload>>>>>>>>>>>', payload);
        T.post(constant.TWITTER_DIRECTDM_MSG, payload, (err, res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>', err, res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
    })


app.post(constant.USER_RETWEET_URL, (request, response) => {
        // console.log('access_token >>>>>>>>>>>>', request)
        const payload = {
            id: request.body.tweet_id,
        }

        console.log('access_tokenPayload>>>>>>>>>>>', payload);
        T.post(constant.TWITTER_RETWEET, payload, (err, res) => {
            console.log('arguments in user_timeline >>>>>>>>>>>>', err, res)
            if (err) {
                return response.send(err);
            }
            console.log('Authentication successful. Running bot...\r\n')
            return response.send(res);
        })
    })
}
// module.exports = app