var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000
var pullData = require('./app.js')

app.get('/', function (req, res){
	res.send(pullData())
})//

app.listen(PORT, function(){

	console.log("Express server listening on port " + PORT +"!")

})