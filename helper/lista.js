'use strict';
var fs = require('fs')

module.exports = function(folder,filter,callback){
	fs.readdir(folder,onReadDir)

	function onReadDir(err,results){
		if(err) return callback(err)

		var files = results.filter(filterFiles)
		callback(null,files)
	}

	function filterFiles(file){
		//console.log(filter+','+file)
		return file.indexOf(filter)!=-1
	}

}