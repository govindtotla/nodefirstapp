const Vendor = require("../models/vendor");

exports.test = function(req, res) {
  res.send("Greetings from the shape controller!");
};

exports.vendors = function(req, res) {
  var documents = Vendor.find({}, null, {sort: {vendor_name: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.vendor = function(req, res) {
	var documents = Vendor.findById(req.params.vendor_id, function(err, vendor) {
		if (err) throw err;
	res.send(vendor);
	return vendor;
	});
};  

exports.delete = function(req, res) {
  var vendor = Vendor.deleteOne({
		_id: req.params.vendor_id
	}, function(err, vendor) {
		if (err)
			res.send(err);
		res.json({ message: 'Vendor deleted Successfully!!' });
	});
};

exports.add = function(req, res) {
  let vendor = new Vendor({
    vendor_name: req.body.vendor_name,
    vendor_short_code: req.body.vendor_short_code
  });
  
  vendor.save(function(err, shape) {
    if (err) {
      console.log("Unsuccessful");
      res.send(err);
    }   
    console.log("Vendor Saved!");
    res.json({ vendor : vendor, message: 'Vendor added Successfully' });
  });
};

exports.update = function(req, res) {
	Vendor.findById(req.body._id, function(err, vendor) {
		if (err)
			res.send(err);
		vendor.vendor_name = req.body.vendor_name;
		vendor.vendor_short_code = req.body.vendor_short_code;
		vendor.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Vendor Name updated!' });
		});
	});
};


exports.vendor_list = function(req, res) {
  var documents = Vendor.find({}, null, {select: {"vendor_name": 1, "_id": 1}, sort: {vendor_name: 1}}, function(err, docs) {
    if (err) throw err;
    
   	const color_pair = {};
   	docs.map(function (stock) {
		color_pair[stock._id] = stock.color_name;
	});
	return res.send(color_pair);
  });
};
