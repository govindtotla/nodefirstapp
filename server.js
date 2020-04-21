// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express   	= require('express');        // call express                
var bodyParser 	= require('body-parser');
var mongoose   	= require('mongoose');
var next 		= require('next');
var dev 		= process.env.NODE_ENV !== 'production'
var app 		= next({ dev });
var handle 		= app.getRequestHandler();
var routes 		= require("./app/routes/");
var port 		= process.env.PORT || 8080;// set our port

const dbURI = "mongodb+srv://zeit-C90vZchtDVmFzTVrNFetQE9J:Passw0rd@gemexi1-kwqju.mongodb.net";
const dbOptions = {
	  useNewUrlParser: true,
	  dbName: "gemexi1"
	};


app.prepare().then(() => {
	
	mongoose.connect(dbURI, dbOptions).then(
	 () => {
	   console.log("Database connection established!");
	 },
	 err => {
	   console.log("Error connecting Database instance due to: ", err);
	 }
	);
	
	const db = mongoose.connection;
	
	var server = express(); // define our app using express  
	server.use(bodyParser.urlencoded({ extended: true }));
	server.use(bodyParser.json());
	server.use("/api", routes);
	
	//var Color     = require('./app/models/color');
	// middleware to use for all requests
	server.use(function(req, res, next) {
		// do logging
		req.db = db;
		console.log('Something is happening.');
		next(); // make sure we go to the next routes and don't stop here
	});
	
	
/*
	server.post('/api/colors', function(req, res) {
		var color = new Color();      // create a new instance of the Bear model
		color.color_name = req.body.color_name;  // set the bears name (comes from the request)
		color.color_alias_name = req.body.color_alias_name;  // set the bears name (comes from the request)
		// save the bear and check for errors
		color.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Color created!' });
		});
	})
	.get('/api/colors', function(req, res) {    
		Color.find(function(err, colors) {
			if (err)
				res.send(err);

			res.json(colors);
		});
	 });
	 
	server.get('/api/stones', function(req, res) {
		res.json([{id:1, stone_name : "scapolite", faux : "Natural", store_category_id : 6810090015, color : ""}, 
				{id:2, stone_name : "turquoise azurite", faux : "Natural", store_category_id : 6810090015, color : "BLUE, GREEN,"},
				{id:3, stone_name : "HESSONITE GARNET", faux : "Natural", store_category_id : 6810090015, color : "ORANGE,"}]);
	 });
	 	*/
	server.get('*', (req, res) => {
		return handle(req, res)
	});
	
	// START THE SERVER
	// =============================================================================
	server.listen(port);
	console.log('Magic happens on port ' + port);
});
