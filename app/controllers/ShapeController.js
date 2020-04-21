const Shape = require("../models/shape");

exports.test = function(req, res) {
  res.send("Greetings from the shape controller!");
};

exports.shapes = function(req, res) {
  var documents = Shape.find({}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};

exports.delete = function(req, res) {
  var documents = Shape.remove({
		_id: req.params.shape_id
	}, function(err, bear) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
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
    }
    console.log("Saved!");
  });
};

exports.put = function(req, res) {
	Shape.findById(req.params.shape_id, function(err, shape) {
		if (err)
			res.send(err);
		shape.name = req.body.name;
		shape.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Shape Name updated!' });
		});
	});
};
