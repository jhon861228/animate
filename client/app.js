var Webrtc2images = require('webrtc2images');
var xhr = require('xhr')

var rtc = new Webrtc2images({
	width: 200,
	height: 200,
	frames: 10,
	type: 'images/jpg',
	quality: 0.4,
	interval: 200
});

rtc.startVideo(function(err) {

});

var record = document.querySelector("#record");

record.addEventListener('click', function(e) {
	e.preventDefault();

	rtc.recordVideo(function(err, frames) {
		if(err)return logError(err)
		
		xhr({
			uri:'/process',
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({images:frames})
		},function(err,res,body){
			if(err) return logError(err)

				console.log(JSON.parse(body))
		})

	});

}, false);

function logError(err) {
	console.log(err)
}