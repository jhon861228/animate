var Webrtc2images  = require('webrtc2images');

var rtc = new Webrtc2images({
	width:200,
	height:200,
	frames:10,
	type:'images/jpg',
	quality:0.4,
	interval:200
});

rtc.startVideo(function(err){

});

var record = document.querySelector("#record");

record.addEventListener('click',function(e){
	e.preventDefault();
	rtc.recordVideo(function(err,frames){
		console.log(frames);
	});

},false);