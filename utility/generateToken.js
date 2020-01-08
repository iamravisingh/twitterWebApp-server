const request = require('request');
const constant = require('../config/constant')

module.exports = {
    generateTwitterToken(apiKey,secretKey) {
        return new Promise((resolve, reject) => {
        const credentials = `${apiKey}:${secretKey}`
        const credentials_base64Key = new Buffer(credentials).toString('base64')
        console.log('key >>>>>>>>>',arguments,credentials,credentials_base64Key);
            request.post({
                url: constant.TWITTER_OAUTH2_TOKEN,
                headers: {
                  'Authorization': `Basic ${credentials_base64Key}`,
                  'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: 'grant_type=client_credentials'
            }, (err, res, body) => {
                    try {
                        console.log('body in bearer toeken>>>>>>>>>>', body);
                        return resolve(body);
                    } catch (err) {
                        console.log('errr while generating the Bearer token>>>>>>>>>>', err);
                        return reject(err);
                    }
            })
        })
    }
}