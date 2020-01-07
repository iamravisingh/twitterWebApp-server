const utility = require('../utility/generateToken');
const express = require('express')
const app = express();
const twitConfig = require('../config/auth').twitterAuth;

app.post('/token', (request, response) => {
    utility.generateTwitterToken(twitConfig.consumer_key,twitConfig.consumer_secret)
        .then(result => {
            console.log('result in toke napi >>>>>>>>>>>', result);
            return response.status(200).send(result)
        })
        .catch(err => {
            return response.status(400).send(result)
        })
})

module.exports = app;
                                        