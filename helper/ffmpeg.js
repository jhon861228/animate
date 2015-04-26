'use strict';
var spawn = require('child_process').spawn
var os = require('os')
var path = require('path')

module.exports = function(option,callback){
	
	if(!option.baseName) return callback(new TypeError('Debe especificar nombre base'))
	var folder = option.folder || os.tmpDir()
	var baseName = option.baseName
	var fileSrc = path.join(folder,baseName+'-%d.jpg')
	var fileDest = path.join(folder,baseName+'.webm')

	console.log(fileSrc)
	console.log(fileDest)
	//ffmpeg -i images-%d.jpg -filter:v "steps=2.5*PTS" -vcodec libvpx -an video.webm
	var ffmpeg = spawn('ffmpeg',[
		'-i',
		fileSrc,
		'-filter:v',
		'setpts=2.5*PTS',
		'-vcodec',
		'libvpx',
		'-an',
		fileDest
		])
	ffmpeg.stdout.on('close',function(code){
		console.log(code)
		if(!code) return callback(null)

		callback(new Error('error con codigo '+code))
	})

}