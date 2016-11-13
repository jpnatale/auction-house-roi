var ahurl = require("./AHURL.js")
var ahData = require("./AHData.js")
var items = require("./items.js")
var schedule = require('node-schedule');
var fs = require('fs')
var jsonfile = require('jsonfile')

var itemIDs = items()[1]
var itemsToGet = items()[0]
var unitPrices = itemsToGet
var costs = items()[2]
var costKeys = Object.keys(costs)
var profits = {}
var roi = {}
var matCosts = {}
var roiOut = {}

module.exports = function(){

pullData()
}




function getCost(){

console.log(" ")
console.log('Cost to Make the Items:')
console.log(' ')
	for (var i = 0, len = costKeys.length; i < len; i++) {
	
		var craftableID = costKeys[i]
		
		var mats = costs[craftableID]
		var matKeys = Object.keys(mats)
		var cost = 0

		for (var j = 0, len2 = matKeys.length; j < len2; j++) {
			
			cost = cost + mats[matKeys[j]]*unitPrices[matKeys[j]]
		}
		matCosts[craftableID] = cost
		profits[craftableID] = 0.95*unitPrices[craftableID]-cost
		console.log(items()[0][craftableID]+ " - " + cost)
		roi[craftableID] = Math.round(100*profits[craftableID]/matCosts[craftableID])


	}

	bestROI()


}



function bestROI (){
	console.log(' ')
	console.log('Maximum ROI is for Making:')
	console.log(' ')
var maxroi = 0
var maxroikey = ""

for (var i = 0, len = costKeys.length; i < len; i++) {
			if(roi[costKeys[i]] > maxroi){
			maxroi = roi[costKeys[i]]
			maxroikey = costKeys[i]
		}

	}

console.log(items()[0][maxroikey] +", for a profit of " + Math.round(profits[maxroikey]) + " and an ROI of "+ maxroi+".") 
	console.log(' ')
	console.log('Maximum Profit is for Making:')
	console.log(' ')

var maxProfit = 0
var maxProfitKey = ""

for (var i = 0, len = costKeys.length; i < len; i++) {
			if(profits[costKeys[i]] > maxProfit){
			maxProfit = profits[costKeys[i]]
			maxProfitKey = costKeys[i]
		}

	}
console.log(items()[0][maxProfitKey] +", for a profit of " + Math.round(profits[maxProfitKey]) + " and an ROI of "+ roi[maxProfitKey]+".") 


}


function pullData () {


ahurl().then(function(dataURLRes){
	console.log(' ')
	console.log("Got Auction House URL.")
	console.log(" ")
	return ahData(dataURLRes.files[0].url)
}).then(function(data){
	console.log('Retrieved Auction House Data.')
	console.log(' ')
	console.log('Current Prices on the Auction House:')
	console.log(' ')
	for (var i = 0, len = itemIDs.length; i < len; i++) {
		var foundUnit = findUnit(data,itemIDs[i])
		var itemName = itemsToGet[itemIDs[i]]
		unitPrices[itemIDs[i]] = foundUnit 
		console.log(itemName +" - " + foundUnit)
	}
	
 }).then(function(){

 	getCost()

 })


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

