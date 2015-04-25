'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8080;
var server = http.createServer();
var router = require('./router');


server.on('request',router);
server.on('listening',onListen);

function onListen(){
	console.log('esta escuchando en 3000');
}

server.listen(3000);