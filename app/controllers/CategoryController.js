const Category = require("../models/category");

exports.test = function(req, res) {
  res.send("Greetings from the Category controller!");
};

exports.category_list = function(req, res) {
  var documents = Category.find({}, null, {select: {"name": 1, "_id": 1}, sort: {name: 1}}, function(err, docs) {
    if (err) throw err;
    
   	const color_pair = {};
   	docs.map(function (stock) {
		color_pair[stock._id] = stock.name;
	});
	return res.send(color_pair);
  });
};

exports.categories = function(req, res) {
  var documents = Category.find({}, null, {sort: {name: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.category = function(req, res) {
	var documents = Category.findById(req.params._id, function(err, category) {
		if (err) throw err;
	res.send(category);
	return category;
	});
};  


exports.delete	=	function(req, res) {
	Category.deleteOne({
		_id: req.params.id
	}, function(err, category) {
		if (err)
			res.send(err);

		res.json({ message: 'Category deleted Successfully!!' });
	});
};
    
    

exports.add = function(req, res) {
  let category = new Category({
    name: req.body.name,
    ebay_id: req.body.ebay_id,
	store_id:req.body.store_id
  });

  category.save(function(err, category) {
    if (err) {
      console.log("Unsuccessful");
      res.send(err);
    }
    console.log("Saved!");
    res.json({ _id : category._id, message: 'Category Successfully Saved' });
  });
};


exports.update = function(req, res) {
	Category.findById(req.body._id, function(err, category) {
		if (err)
			res.send(err);
		category.name = req.body.name;
		category.ebay_id = req.body.ebay_id;
		category.store_id = req.body.store_id;
		category.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Category Name updated!' });
		});
	});
};


