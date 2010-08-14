// log etc.
var sys = require('sys');

// express is based on connect 
var connect = require('connect');
// init express app 
var app = require('express').createServer();
// init couchdb
var couchdb = require('./node-couchdb/lib/couchdb');
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
	
	var data = eval('(' + data + ')');
	if (typeof data != 'object') {
		throw new Error('keyboard cat is not a object!');
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

