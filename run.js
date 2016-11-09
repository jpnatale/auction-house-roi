var ahurl = require("./AHURL.js")
var ahData = require("./AHData.js")
var items = require("./items.js")
var schedule = require('node-schedule');
var fs = require('fs')
var jsonfile = require('jsonfile')

var itemIDs = items()[1]
var itemsToGet = items()[0]
var unitPrices = itemsToGet

pullData()











function pullData () {
ahurl().then(function(dataURLRes){
	console.log("Got Auction House URL")
	return ahData(dataURLRes.files[0].url)
}).then(function(data){
	console.log('Retrieved Auction House Data')
	for (var i = 0, len = itemIDs.length; i < len; i++) {
		var foundUnit = findUnit(data,itemIDs[i])
		var itemName = itemsToGet[itemIDs[i]]
		unitPrices[itemIDs[i]] = foundUnit 
		console.log(itemName +" - " + foundUnit)
	}
	//console.log(unitPrices)
 })//.then(function(){
// var file = './pulledData.txt'
// var obj = unitPrices
 
// jsonfile.writeFile(file, obj, function (err) {
//   console.error(err)
// })


// })
}

function findUnit (data,itemID){

var matches = []

for (var i = 0, len = data.auctions.length; i < len; i++) {
  
if(data.auctions[i].item == itemID){
	var unit = data.auctions[i].buyout/data.auctions[i].quantity

	if (unit>0){

		matches.push(Math.round(unit/10000))}

}}

if (matches.length>1){
matches = matches.sort( function(a,b) { return a - b; } )} else{
	matches = "Not enough auctions available"
}

var finalUnit = 0
if(matches.length<6){
	finalUnit = (matches[0]+matches[1])/2
}
else if(matches.length>5){
	finalUnit = Math.round((matches[0]+matches[1]+matches[2]+matches[3])/4)

}

return finalUnit


}

