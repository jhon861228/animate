var path = require('path');
var st = require('st');

var mount = st({
	path:path.join(__dirname,'..','public'),
	index:'index3.html'
});
function onRequest(req,res){
	mount(req,res,function(err){
		if(err)return res.end(err.message);

		res.statusCode = 404;
		res.end('not found');
	})
}
module.exports = onRequest