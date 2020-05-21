const Style = require("../models/style");

exports.test = function(req, res) {
  res.send("Greetings from the style controller!");
};

exports.styles = function(req, res) {
  var documents = Style.find({}, null, {sort: {style_name: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.style = function(req, res) {
	var documents = Style.findById(req.params.style_id, function(err, style) {
		if (err) throw err;
	res.send(style);
	return style;
	});
};  

exports.delete = function(req, res) {
  var style = Style.deleteOne({
		_id: req.params.style_id
	}, function(err, vendor) {
		if (err)
			res.send(err);
		res.json({ message: 'Style deleted Successfully!!' });
	});
};

exports.add = function(req, res) {
  let style = new Style({
    style_name: req.body.style_name,
    style_short_code: req.body.style_short_code
  });
  
  style.save(function(err, shape) {
    if (err) {
      console.log("Unsuccessful");
      res.send(err);
    }   
    console.log("Style Saved!");
    res.json({ style : style, message: 'Style added Successfully' });
  });
};

exports.update = function(req, res) {
	Style.findById(req.body._id, function(err, style) {
		if (err)
			res.send(err);
		style.style_name = req.body.style_name;
		style.style_short_code = req.body.style_short_code;
		style.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Style Name updated!' });
		});
	});
};


exports.style_list = function(req, res) {
  var documents = Style.find({}, null, {select: {"style_name": 1, "_id": 1}, sort: {style_name: 1}}, function(err, docs) {
    if (err) throw err;
    
   	const color_pair = {};
   	docs.map(function (stock) {
		color_pair[stock._id] = stock.color_name;
	});
	return res.send(color_pair);
  });
};
