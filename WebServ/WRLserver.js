var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var webzoneDir = "C:\\Webzone\\WebPage";



http.createServer(function (req, res) {
	try {
		
		var reqUrl = url.parse(req.url);
		var filename = webzoneDir+path.normalize(reqUrl.pathname);
		console.log(req.connection.remoteAddress + " requested " + filename);
		
		fs.exists( filename, function(exists){
			if(exists){
				if (fs.statSync(filename).isDirectory()){ 
					filename += '/index.html';
				}				
				var fileStream = fs.createReadStream(filename);
				res.writeHead( 200, { "Content-Type":"text/html"});
				fileStream.pipe(res);
				fileStream.on('error',function(e) {
					res.writeHead(404);    
					res.end("Okay wise guy.  " + req.connection.remoteAddress + " was it? Listen, so like, whatever you wanted evidently isn't a thing.  Git gud or git bent broni-hana.");
				});	
				
			} else{
			res.writeHead(404);    
			res.end("Okay wise guy.  " + req.connection.remoteAddress + " was it? Listen, so like, whatever you wanted evidently isn't a thing.");
			}
		});
	}
	catch(e) {
		res.writeHead(500);
		res.end();     
		console.log(e.stack);
	}
}).listen(80);


console.log( "Server running at http://74.133.15.189" );