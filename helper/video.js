'use strict';

var EventEmitter = require('events').EventEmitter
var async = require('async')
var dataURI = require('data-uri-to-buffer')
var uuid = require('uuid')
var os = require('os')
var fs = require('fs')
var path = require('path')
var list = require('./lista')
var ffmpeg = require('./ffmpeg')

module.exports = function(images){
	var events = new EventEmitter()
	var count =0;
	var nameBase = uuid.v4()
	var tmpDir = os.tmpDir()

	async.series([
		decodeImages,
		createVideo,
		encodeVideo
		//cleanup
		],convertFinished)

	function decodeImages(done){
		async.eachSeries(images,decodeImage,done)
	}

	function decodeImage(image,done){
		var fileName = nameBase+'-'+(count++)+'.jpg'
		var buffer = dataURI(image)
		var ws = fs.createWriteStream(path.join(tmpDir,fileName))

		ws.on('error',done).end(buffer,done)
		events.emit('log','Convertido '+fileName)

	}

	function createVideo(done){
		ffmpeg({
			baseName:nameBase,
			folder:tmpDir
		},done)
		
	}

	function encodeVideo(done){
		done()
	}

	function cleanup(done){
		events.emit('log','estamos limpiando')
		list(tmpDir,nameBase,function(err,files){
			if(err) return done(err)

			deleteFiles(files,done)
		})
		done()
	}

	function deleteFiles(files,done){
		
		async.each(files,deleteFile,done)
	}

	function deleteFile(file,done){
		events.emit('log','estamos borrando ')
		//console.log(file)
		fs.unlink(path.join(tmpDir,file),function(err){
			//ignoro error
			//done()
		})
	}
	function convertFinished(err){
		setTimeout(function(){
			events.emit('video','Este video esta codificado')
		}, 1000);	
	}

	

	return events;
}