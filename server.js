'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8080;
var server = http.createServer();

server.on('request',onRequest);
server.on('listening',onListen);

function onRequest(req,res){
	var index = path.join(__dirname,'public','index.html');
	var rs = fs.createReadStream(index);
	res.setHeader('content-Type','text/html');
	rs.pipe(res);
	rs.on('error',function(){
		res.end(err.message);
	});
		
	
}
function onListen(){
	console.log("esta escuchando en 3000");
}

server.listen(3000);