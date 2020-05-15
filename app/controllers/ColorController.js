const Color = require("../models/color");

exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.color_list = function(req, res) {
  var documents = Color.find({}, null, {select: {"color_name": 1, "_id": 1}, sort: {color_name: 1}}, function(err, docs) {
    if (err) throw err;
    
   	const color_pair = {};
   	docs.map(function (stock) {
		color_pair[stock._id] = stock.color_name;
	});
	return res.send(color_pair);
  });
};

exports.colors = function(req, res) {
  var documents = Color.find({}, null, {sort: {color_name: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.color = function(req, res) {
	var documents = Color.findById(req.params.color_id, function(err, color) {
		if (err) throw err;
	res.send(color);
	return color;
	});
};  


exports.delete	=	function(req, res) {
	Color.deleteOne({
		_id: req.params.color_id
	}, function(err, color) {
		if (err)
			res.send(err);

		res.json({ message: 'Color deleted Successfully!!' });
	});
};
    
    

exports.add = function(req, res) {
  let color = new Color({
    color_name: req.body.color_name,
    color_alias_name: req.body.color_alias_name
  });

  color.save(function(err, color) {
    if (err) {
      console.log("Unsuccessful");
      res.send(err);
    }
    console.log("Saved!");
    res.json({ _id : color._id, message: 'Color Successfully Saved' });
  });
};


exports.update = function(req, res) {
	Color.findById(req.body._id, function(err, color) {
		if (err)
			res.send(err);
		color.color_name = req.body.color_name;
		color.color_alias_name = req.body.color_alias_name;
		color.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Color Name updated!' });
		});
	});
};


