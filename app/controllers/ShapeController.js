const Shape = require("../models/shape");

exports.test = function(req, res) {
  res.send("Greetings from the shape controller!");
};

exports.shapes = function(req, res) {
  var documents = Shape.find({}, null, {sort: {shape_name: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.shape = function(req, res) {
	var documents = Shape.findById(req.params.shape_id, function(err, shape) {
		if (err) throw err;
	res.send(shape);
	return shape;
	});
};  

exports.delete = function(req, res) {
  var shape = Shape.remove({
		_id: req.params.shape_id
	}, function(err, shape) {
		if (err)
			res.send(err);
		res.json({ message: 'Stone Shape deleted Successfully!!' });
	});
};

exports.add = function(req, res) {
  let shape = new Shape({
    shape_name: req.body.shape_name,
    if_ebay: req.body.if_ebay
  });
  
  shape.save(function(err, shape) {
    if (err) {
      console.log("Unsuccessful");
      res.send(err);
    }   
    console.log("Shape Saved!");
    res.json({ shape : shape, message: 'Stone Shape added Successfully' });
  });
};

exports.update = function(req, res) {
	Shape.findById(req.body._id, function(err, shape) {
		if (err)
			res.send(err);
		shape.shape_name = req.body.shape_name;
		shape.if_ebay = req.body.if_ebay;
		shape.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Shape Name updated!' });
		});
	});
};
