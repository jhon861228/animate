var path = require('path');
var st = require('st');
var course = require('course');
var router = course()
var jsonbody = require('body/json')
var helper = require('../helper')


var mount = st({
	path:path.join(__dirname,'..','public'),
	index:'index.html',
	passthrough:true
});

router.post('/process',function(req,res){
	jsonbody(req,res,{limit:3*1024*1024},function(err,body){
		if(err) return fail(err,res)

		var converter = helper.convertVideo(body.images)

		converter.on('log',function(msg){
			console.log(msg)
		})
		converter.on('video',function(video){

			res.setHeader('Content-Type','application/json')
			res.end(JSON.stringify({video:video}))

		})

		
	})
})
function onRequest(req,res){
	mount(req,res,function(err){
		if(err)return fail(err,res);

		router(req,res,function(err){
			if(err){return fail(err,res)}
				res.statusCode = 404;
				res.end('not found');
		})

		
	})
}
function fail(err,res){
	res.statusCode = 500;
	res.setHeader('Content-Type','text/plain');
	res.end(err.message);
}

module.exports = onRequest