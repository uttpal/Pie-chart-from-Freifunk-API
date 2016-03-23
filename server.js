/**
 * application on ExpressJS, Node, MongoDb.
 * @developer Kumar Uttpal
 */


//server.js

// Set-Up --------------------------------------------------------------------------

//setting all required modules and files

var http = require('http');
var fs = require('fs');
var express  	 = require('express');
var app      	 = express();
var port     	 = process.env.PORT || 8080; 			//environment port else

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index.ejs'); 
});

					

// launching ---------------------------------------------------------------------
app.listen(port);
console.log('Have Fun on ' + port);

