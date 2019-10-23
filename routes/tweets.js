
var express = require('express');
var Twitter = require('mtwitter');

var app = express();

//shows tweet
app.get('/:name', function (req, res) {

    var user = req.params.name;

    var twit = new Twitter({
        consumer_key: 'zppmeH9NOgWv8W9zLj7RkTMfK',
        consumer_secret: 'cBOknxIYKi4idfv9GvRnsYsk9Adwk7qzYO7XDn2eDmrcWlcvYb',
        access_token_key: '701209524355649536-IXMMrocUguBNPUsSpAwnQGzJEH49nnv',
        access_token_secret: 'rHYlseVVCmknWGWA4l7HmSW0oZ64Onp9K56C9CzOE6s57'
    });

    //twit.get("/statuses/user_timeline", { "include_entities": false },
    
    twit.get("/statuses/user_timeline.json?screen_name="+user+"&count=100",
        function (err, data) {
            if (err) {
                res.write(err.toString());
            }
            else res.write(JSON.stringify(data));

            res.end('\n');
        });
});

//post tweet
app.post('/postear', function (req, res) {

	var body = req.body;

	var twit = new Twitter({
        consumer_key: 'zppmeH9NOgWv8W9zLj7RkTMfK',
        consumer_secret: 'cBOknxIYKi4idfv9GvRnsYsk9Adwk7qzYO7XDn2eDmrcWlcvYb',
        access_token_key: '701209524355649536-IXMMrocUguBNPUsSpAwnQGzJEH49nnv',
        access_token_secret: 'rHYlseVVCmknWGWA4l7HmSW0oZ64Onp9K56C9CzOE6s57'
    });

	twit.post('statuses/update', {status: body.posttweet }, function(error, tweet, response) {

	    if (!error) {

		    return res.status(400).json({
	            ok: true,
	            mensaje: 'Error al crear el tweet',
	            errors: err
	        });
	  	}

	    res.status(201).json({
            ok: true,
            guardado: response
        });


	});

});

module.exports = app;