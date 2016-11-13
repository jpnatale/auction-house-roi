var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000
var run = require('./run.js')


app.get('/', function (req, res){
	res.send('Auction House ROI')
})//


app.listen(PORT, function(){

	console.log("Express server listening on port " + PORT +"!")

})