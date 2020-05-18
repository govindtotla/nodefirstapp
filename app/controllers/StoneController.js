const Stone = require("../models/stone");
var path 		= require('path');

exports.test = function(req, res) {
  res.send("Greetings from the Stone controller!");
};

exports.stones = function(req, res) {
  var documents = Stone.find({}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};

exports.delete = function(req, res) {
  var stone = Stone.deleteOne({
		_id: req.params.stone_id
	}, function(err, stone) {
		if (err)
			res.send(err);
		res.json({ message: 'Stone deleted Successfully!!' });
	});
};

exports.stone = function(req, res) {
	var documents = Stone.findById(req.params.stone_id, function(err, stone) {
		if (err) throw err;
		return res.json({ stone : stone });
	});
};


exports.add = function(req, res) {
		
	let stone = new Stone({
		stone_name: req.body.stone_name,
		store_category_id: req.body.store_category_id,
		faux_id: req.body.faux_id,
		web_stone_id: req.body.web_stone_id,
		color_id: req.body.color_id.split(',')
	  });
	
	stone.save(function(err, stone) {
		if (err) {
			if (err.code === 11000) {
				return res.status(400).send('Stone Name already Exist');
			}
			console.log(err.code + " Unsuccessful");
			return res.status(400).send(err);
		}
		
		if ( req.files )
		{
			let imageFile 			= req.files.file;		
			if(imageFile.mimetype !== 'image/png' && imageFile.mimetype !== 'image/jpg' && imageFile.mimetype !== 'image/jpeg')
				return res.status(400).send({ message: 'Supported image files are jpeg, jpg, and png' });		
			let ext	=	path.extname(imageFile.name);
			
			let filename	=	stone._id + ext;
			let newPath = __basedir + '/public/images/stones/' + filename;
		
			imageFile.mv(newPath, function(err) {
				if (err) {
				  return res.status(400).send(err);
				}
				stone.stone_image  		= filename;
				stone.save();
			});        
		}
		return res.json({ stone : stone, message: 'Stone added Successfully' });
	  });
	
};

exports.delete	=	function(req, res) {
	Stone.deleteOne({
		_id: req.params.stone_id
	}, function(err, stone) {
		if (err)
			res.send(err);

		res.json({ message: 'Stone deleted Successfully!!' });
	});
};


exports.update = function(req, res) {
	
	Stone.findById(req.params.stone_id, function(err, stone) {
            if (err)
                res.send(err);
            
			stone.stone_name 		= req.body.stone_name;
			stone.store_category_id = req.body.store_category_id;
			stone.faux_id 			= req.body.faux_id;
			stone.web_stone_id  	= req.body.web_stone_id;
			stone.color_id  		= req.body.color_id.split(',');
			
            // save the bear
            stone.save(function(err) {
                if (err) {
					if (err.code === 11000) {
						return res.status(400).send('Stone Name already Exist');
					}
				}
				
				if ( req.files )
				{
					let imageFile 			= req.files.file;
					if(imageFile.mimetype !== 'image/png' && imageFile.mimetype !== 'image/jpg' && imageFile.mimetype !== 'image/jpeg')
						return res.status(400).send({ message: 'Supported image files are jpeg, jpg, and png' });
					
					let ext	=	path.extname(imageFile.name);
			
					let filename	=	stone._id + ext;
					let newPath = __basedir + '/public/images/stones/' + filename;
					imageFile.mv(newPath, function(err) {
						if (err) {
						  return res.status(400).send(err);
						}
						stone.stone_image  		= filename;
						stone.save();
						//Stone.findOneAndUpdate({ _id: stone._id }, { stone_image: filename });						
					});
				}			
				return res.json({ message: 'Stone updated Successfully' });
            });
        });	
}; 
    
    
