var express = require('express');
var app = express();
var http = require('http');
var time = new Date();

var apiKey = "key=AIzaSyCv1BG9dYbjn5eyiBtL54yUwuz-ywZv-U8";
var gMapsDM = "https://maps.googleapis.com/maps/api/distancematrix/json?";


app.locals.title = 'Wargar Research Labs Webzone';
app.locals.email = 'leducbot@gmail.com';

var requestLog = function (req, res, next) {
	console.log( req.connection.remoteAddress + " requested " + req.url + " on " + time.toString().split(' ').splice(0,5).join(' ') );
	next();
}

app.use(requestLog);
app.use('/', express.static("C:\\webzone\\webpage") );

app.get('/defGDMurl', function( req, res) {
	var gdmRegEx = /origins=.*/;
	var gDMurl = req.url.match(gdmRegEx)[0];
	gmdmQuery= gMapsDM + gDMurl + "&" + apiKey;
	console.log(gmdmQuery);
	
});

app.listen(80, function(){
	console.log("express test on port 80");
});