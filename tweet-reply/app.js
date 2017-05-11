var twitter = require('twit');
var sleep = require('sleep');
var config = require('./config.js');

var twit = new twitter({
  consumer_key: config.keys.consumer_key,
  consumer_secret: config.keys.consumer_secret,
  access_token: config.keys.access_token_key,
  access_token_secret: config.keys.access_token_secret
});

console.log("Tweet listening...");

var userArray = ['iaubilisim']; //case sensetive
var message = " Message";
var counter = 0;
var stream = twit.stream('user', { track: userArray });

stream.on('tweet', function (tweet) {
  console.log(tweet.user.screen_name);
  if (tweet.text && userArray.indexOf(tweet.user.screen_name) > -1){
    console.log(tweet.user.screen_name + " => " + tweet.text);
    counter = counter + 1;
    sleep.sleep(3);
    twit.post('statuses/update', {in_reply_to_status_id: tweet.id_str, status: '@' + tweet.user.screen_name + message + " " + counter}, function(err, data, response) {
        if(err){
            console.log("Error => ");
            console.log(err);
        }
        if (response){
          console.log('tweet sent!');
        }
    });
  }
  //console.log(tweet);
});