//Twitter API
const constants = {
    //twitter api endpoint:
    TWITTER_VERIFY_CREDENTIALS  : '/account/verify_credentials',
    TWITTER_USER_TIMELINE       : '/statuses/user_timeline',
    TWITTER_HOME_TIMELINE       : '/statuses/home_timeline',
    TWITTER_STATUS_TWEET        : '/statuses/update',
    TWITTER_ACCESS_TOKEN        : '/access_token',
    TWITTER_DIRECTDM_MSG        : 'direct_messages/events/new',
    TWITTER_DIRECTMESSAGE       : '/direct_messages/',
    TWITTER_RETWEET             : `/statuses/retweet/:id`,
    TWITTER_OAUTH2_TOKEN        : 'https://api.twitter.com/oauth2/token',
    
    // local endpoint
    USER_VERIFY_CREDENTIALS  : "/verify_Usercredentials",
    USER_TIMELINE_URL        : '/user_timeline/:screen_name',
    USER_HOME_TIMELINE_URL   : '/home_timeline',
    USER_TWEET_URL           : '/statusUpdate',
    USER_ACCESS_TOKEN_URL    : '/access_token',
    USER_DIRECT_MSG_URL      : '/newMessage',
    USER_RETWEET_URL         : '/reTweet',
    USER_GENERATE_TOKEN_URL  : '/token',
    
    BASER_URL : 'localhost'
    
}

module.exports = constants;