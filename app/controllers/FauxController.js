const Faux = require("../models/faux");

exports.test = function(req, res) {
  res.send("Greetings from the faux controller!");
};

exports.faux = function(req, res) {
  var documents = Faux.find({}, null, {sort: {faux_type: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.faux_list = function(req, res) {
  var documents = Faux.find({}, null, {select: {"faux_value": 1, "_id": 1}, sort: {faux_value: 1}}, function(err, docs) {
    if (err) throw err;
    
   	const color_pair = {};
   	docs.map(function (stock) {
		color_pair[stock._id] = stock.faux_value;
	});
	return res.send(color_pair);
  });
};
