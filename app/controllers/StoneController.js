const Stone = require("../models/stone");

exports.test = function(req, res) {
  res.send("Greetings from the Stone controller!");
};

exports.stones = function(req, res) {
	
	res.json([
		{id:1, stone_name : "scapolite", faux : "Natural", store_category_id : 6810090015, color : ""}, 
		{id:2, stone_name : "turquoise azurite", faux : "Natural", store_category_id : 6810090015, color : "BLUE, GREEN,"},
		{id:3, stone_name : "HESSONITE GARNET", faux : "Natural", store_category_id : 6810090015, color : "ORANGE,"},
		{id:4, stone_name : "Citrine", faux : "Natural", store_category_id : 6810090223, color : "yelloW,"},
		{id:5, stone_name : "emerald", faux : "Natural", store_category_id : 6810090255, color : "Green,"}
		
	]);
	
  /*var documents = Stone.find({}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });*/
};
