const Brand = require("../models/brand");

exports.test = function(req, res) {
  res.send("Greetings from the brand controller!");
};

exports.brands = function(req, res) {
  var documents = Brand.find({}, null, {sort: {brand_name: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.brand = function(req, res) {
	var documents = Brand.findById(req.params.brand_id, function(err, brand) {
		if (err) throw err;
	res.send(brand);
	return brand;
	});
};  

exports.delete = function(req, res) {
  var brand = Brand.deleteOne({
		_id: req.params.brand_id
	}, function(err, brand) {
		if (err)
			res.send(err);
		res.json({ message: 'Brand deleted Successfully!!' });
	});
};

exports.add = function(req, res) {
  let brand = new Brand({
    brand_name: req.body.brand_name,
   brand_short_code: req.body.brand_short_code
  });
  
  brand.save(function(err, shape) {
    if (err) {
      console.log("Unsuccessful");
      res.send(err);
    }   
    console.log("Brand Saved!");
    res.json({ brand : brand, message: 'Brand added Successfully' });
  });
};

exports.update = function(req, res) {
	Brand.findById(req.body._id, function(err, brand) {
		if (err)
			res.send(err);
		brand.brand_name = req.body.brand_name;
		brand.brand_short_code = req.body.brand_short_code;
		brand.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Brand Name updated!' });
		});
	});
};


exports.brand_list = function(req, res) {
  var documents = Brand.find({}, null, {select: {"brand_name": 1, "_id": 1}, sort: {brand_name: 1}}, function(err, docs) {
    if (err) throw err;
    
   	const color_pair = {};
   	docs.map(function (stock) {
		color_pair[stock._id] = stock.color_name;
	});
	return res.send(color_pair);
  });
};
