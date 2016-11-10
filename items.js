
module.exports = function(){
	var itemIDS = [124105, 124101, 124102, 124104, 124103, 142117, 124442, 124441, 124440, 124444, 124106, 127850, 127849, 127848, 127847, 127842, 128542, 128543, 128541, 128548, 128550, 128549]

	var itemsToGet = {
		"124105": "Starlight Rose",
		"124101": "Aethril",
		"124102": "Dreamleaf",
		"124104": "Fjarnskaggl",
		"124103": "Foxflower",
		"142117": "Blood of Sargeras (10x Prolonged Power)",
		"124442": "Chaos Crystal",
		"124441": "Leylight Shard",
		"124440": "Arkhana",
		"124444": "Infernal Brimstone",
		"124106": "Felwort",
		"127850": "Flask of Ten Thousand Scars",
		"127849": "Flask of the Countless Armies",
		"127848": "Flask of the Sevent Demon",
		"127847": "Flask of the Whispered Pack",
		"127842": "Infernal Alchemist Stone",
		"128542": "Ring: Binding of Haste",
		"128543": "Ring: Binding of Mastery",
		"128541": "Ring: Binding of Critical Strike",
		"128548": "Cloak: Binding of Strength",
		"128550": "Cloak: Binding of Intellect",
		"128549": "Cloak: Binding of Agilty"}

	var mats = {
			"127850":{"124105":7,
						"124101":10,
						"124102":10},
			"127849":{"124105":7,
						"124101":10,
						"124103":10},
			"127848":{"124105":7,
						"124104":10,
						"124103":10},
			"127847":{"124105":7,
						"124104":10,
						"124102":10},
			"127842":{"142117":30,
					"124106":5,
					"124444":1},
			"128542":{"124442":4,
					"124440":50},
			"128543":{"124442":4,
					"124440":50},
			"128541":{"124442":4,
					"124440":50},
			"128548":{"142117":20,
					"124442":8,
					"124440":30},
			"128550":{"142117":20,
					"124442":8,
					"124440":30},
			"128549":{"142117":20,
					"124442":8,
					"124440":30}
	}

	var items = [itemsToGet,itemIDS,mats]

	return items

}