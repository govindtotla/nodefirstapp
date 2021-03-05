// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express   	= require('express');        // call express                
var bodyParser 	= require('body-parser');
var mongoose   	= require('mongoose');
var next 		= require('next');
var fileUpload 	= require('express-fileupload');
var cors 		= require('cors');
var path 		= require('path');
var Excel 		= require('exceljs');
var passport 	= require("passport");

var dev 		= process.env.NODE_ENV !== 'production'
var app 		= next({ dev });
var handle 		= app.getRequestHandler();
var routes 		= require("./app/routes/");
var port 		= process.env.PORT || 8080;// set our port

global.__basedir = __dirname;

const dbURI = process.env.DB_URI;
const dbOptions = {
	  useNewUrlParser: true,
	  dbName: "yourdbname"
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
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(cors());	
	server.use(fileUpload());
	server.use(bodyParser.json());
	server.use(passport.initialize());
	
	// Passport config
	require("./app/config/passport")(passport);

	server.use('/public', express.static(__dirname + '/public'));
	server.use("/api", routes);
	
	// middleware to use for all requests
	server.use(function(req, res, next) {
		// do logging
		req.db = db;
		console.log('Something is happening.');
		next(); // make sure we go to the next routes and don't stop here
	});
	
	server.get('*', (req, res) => {
		return handle(req, res)
	});
	
	// START THE SERVER
	// =============================================================================
	server.listen(port);
	console.log('Magic happens on port ' + port);
});
