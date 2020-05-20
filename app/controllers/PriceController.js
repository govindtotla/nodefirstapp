const Price = require("../models/price");
var Excel 		= require('exceljs');

exports.test = function(req, res) {
  res.send("Greetings from the shape controller!");
};

exports.prices = function(req, res) {
  var documents = Price.find({}, null, {sort: {createdAt: -1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.price = function(req, res) {
	var documents = Price.findById(req.params.price_id, function(err, price) {
		if (err) throw err;
		res.send(price);
		return price;
	});
};  

exports.delete = function(req, res) {	
  var price = Price.deleteOne({
		_id: req.params.price_id
	}, function(err, vendor) {
		if (err)
			res.send(err);
		res.json({ message: 'Lot Price deleted Successfully!!' });
	});
};

exports.add = function(req, res) {
  let price = new Price({
    lot_number: req.body.lot_number,
    lot_price: req.body.lot_price
  });
  
  price.save(function(err, price) {
    if (err) {
      console.log("Unsuccessful");
      res.send(err);
    }   
    console.log("price Saved!");
    res.json({ price : price, message: 'Lot Price added Successfully' });
  });
};

exports.update = function(req, res) {
	Price.findById(req.body._id, function(err, price) {
		if (err)
			res.send(err);
		price.lot_number = req.body.lot_number;
		price.lot_price = req.body.lot_price;
		price.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Lot Price updated!' });
		});
	});
};


exports.price_list = function(req, res) {
  var documents = Price.find({}, null, {select: {"lot_number": 1, "lot_price": 1}, sort: {lot_number: 1}}, function(err, docs) {
    if (err) throw err;
    
   	const color_pair = {};
   	docs.map(function (stock) {
		color_pair[stock.lot_number] = stock.lot_price;
	});
	return res.send(color_pair);
  });
};

exports.import_prices = function(req, res) {
	if ( req.files )
	{
		/*Price.deleteMany({}, function(err) {
				if (err) {
					console.log(err)
				} else {
					console.log('deleted all success');
				}
			}
		);*/
		
		let imageFile 			= req.files.file;			
		let newPath = __basedir + '/public/price_excel/' + imageFile.name;
		imageFile.mv(newPath, function(err) {
			if (err) {
			  return res.status(400).send(err);
			}
			
			var insertedDocs = [];
			var workbook 	= new Excel.Workbook();
			workbook.xlsx.readFile(newPath).then(function(){
				var workSheet =  workbook.getWorksheet();
				workSheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
					
					currRow = workSheet.getRow(rowNumber);						
					let price = new Price({
						lot_number: currRow.getCell(1).value,
						lot_price: currRow.getCell(2).value
					  });						  
					insertedDocs.push(price);						
					 //console.log(rowNumber + " -")						 
					 //console.log("Lot Number :" +  +", Price :" +currRow.getCell(2).value);
					 //console.log("Lot Number :" + row.values[1] +", Price :" +  row.values[2] );
				  });
				  Price.insertMany(insertedDocs).then((result) => {
						return res.status(200).json({ message: 'Price Imported Successfully' });
					})
					.catch((err) => {
						if (err.code === 11000) {
							return res.status(400).send('Duplicate Lot Number Exists');
						}
						return res.status(400).send('Error in Saving Data');
					});
			})
			.catch(function(err) {
				return res.status(400).send('Unable to read File');
			});
		});
	}
};
