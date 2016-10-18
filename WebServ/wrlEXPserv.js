var express = require('express');
var app = express();
var https = require('https');
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

app.get('/defGDMurl', function( clientReq, clientRes, next) {
	var gdmRegEx = /origins=.*/;
	var gDMurl = clientReq.url.match(gdmRegEx)[0];
		
	gmdmQuery= gMapsDM + gDMurl + "&" + apiKey;
	
	
	https.get( gmdmQuery , function(res){
		res.pipe(clientRes, { end: 'true' });
	})
});




app.listen(80, function(){
	console.log("express test on port 80");
});
