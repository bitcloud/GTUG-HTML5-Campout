// log etc.
var sys = require('sys');

// express is based on connect 
var connect = require('connect');

// init express app 
var app = require('express').createServer();

// init couchdb
var couchdb = require('./couchdb/lib/couchdb');

// create a client to couchdb
client = couchdb.createClient(5984, 'localhost'), db = client.db('geogame');

app.use(connect.logger());
app.use(connect.bodyDecoder());
app.use(connect.methodOverride());
app.use(connect.cookieDecoder());

/*
 * Stores the data
 */
app.post('/own/:user', function(req, res) {
	
	if (typeof req.params.user == "undefined") {
		 throw new Error('keyboard cat is not a user!');
	}
	var data = req.param('data');
	// check if data is json 
	// var data = eval('(' + data + ')');
	var data = JSON.parse(data);
	// so since when is an Array a typeof object? sebs does not approve of this 
	// nodejs thinks otherwise and took 30 minutes of my life i could have spent with 
	// coke, blackjack and poledancers 
	if (typeof data != 'object') {
		throw new Error('keyboard cat is not a object!');
	}
	
	// data must be array of {"id":"12.12.2010 09:00:00","lat":12.121231,"long":32.321131,"heading":33,"speed":2}
	if (data.length == 0) {
		throw new Error('keyboard cats length is null');
	}
	
	var row = null;
	// check if all values are there
	var toCheck = {
		'id':1,
		'lat':1, 
		'long':1, 
		'heading':1, 
		'speed':1
	}
	
	// identifer of teh variable to check actually, just a shortcut
	var checkMe = '';
	
	sys.log('rows to check ' + data.length);
	
	// iterate over all the data passed 
	for (i in data) {
		// shortcut for row
		row = data[i];
		sys.log(JSON.stringify(row));
		// iterate over the checker
		for (j in toCheck) {
			// the key to check
			checkMe = j;
			
			sys.log('key ' + j);
			sys.log('row number' + i);
			sys.log('key exists? ' + typeof row[j]);
			
			if (typeof row[j] == 'undefined') {
				throw new Error('keyboardcat misses a value ' + j + 'in row ' + i + JSON.stringify(row));
			}
		}
	}

	// iterate over data and check for all fields 
	res.send(JSON.stringify('stored '+ req.params.user));
}); 

/*
 * request location data based on one user
 */
app.get('/all/', function(req, res){

	var CouchCb = function(er, data) {
		// shortcut for iteration
		var row = null;
		// new array containing the data presented to the client
		var returnData = [];
		// iterate over original data
		for (i in data.rows) {
			// put the data to teh shortcut
			row = data.rows[i];
			// cheat the user in which is only a key in the couch document
			row.value.user = row.id;
			// push the data to the array passed back later
			returnData.push(row.value);
		}
		// send the data to the client
		res.send(JSON.stringify(returnData));		
	}
	
	client.request({
	  path: '/geogame/_design/geogame/_view/user',
	  query: {reduce: false},
	  full: false
	}, CouchCb);

});

/*
 * request location data based on one user
 */
app.get('/own/:user', function(req, res){

	var CouchCb = function(er, data) {
		// shortcut for iteration
		var row = null;
		// new array containing the data presented to the client
		var returnData = [];
		// iterate over original data
		for (i in data.rows) {
			// put the data to teh shortcut
			row = data.rows[i];
			// cheat the user in which is only a key in the couch document
			row.value.user = row.id;
			// push the data to the array passed back later
			returnData.push(row.value);
		}
		// send the data to the client
		res.send(JSON.stringify(returnData));		
	}
	
	client.request({
	  path: '/geogame/_design/geogame/_view/user',
	  query: {reduce: false, key: ["sebs"]},
	  full: false
	}, CouchCb);

});
app.listen(3000);
