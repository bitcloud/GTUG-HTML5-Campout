/*
 * Geo functions to be called by client html page
 */

var timerid;
var interval;
//periodically stores current location, to be called on document.ready
function periodicallyUpdateLocation(){
	console.log('periodical update');
	localStorage.clear();
	interval = 1000 * 5; //one minute
	timerid = setInterval(storeCurrentLocation,interval);
}

/**
 * Collect all periodically methods to call
 *
 */
function intervalCaller()
{	
	storeCurrentLocation();
	readAndDrawLocations();
}

// determine current position, and write it to local storage
function storeCurrentLocation(){
	console.log('store current location');
	var thresholdInMeters = 30;
	navigator.geolocation.getCurrentPosition(function(position) {
		console.log('get current postition');
	   var distance = distanceFromLastLocation(position.coords.latitude,position.coords.longitude);
	   updateMe(position.coords.latitude,position.coords.longitude);
	   if (distance > thresholdInMeters ) {
	   
			// @TODO: add heading and speed - this is also saved!
	   	   writeCoordinate(position.coords.latitude,position.coords.longitude,position.coords.heading,position.coords.spead);	

	   }
	}, 
  function(error) {
	    alert('could not get position');
	});
	
}

/**
 * Read data from local storage via storage.js and draw polylines 
 * on global accessible map (prepared from gmap.js)
 *
 */
function readAndDrawLocations()
{
	var now = new Date();

  var coords = readCoordinates( now - interval , now);
	/*	
	 * coordinate.id = timestamp;
	 *	coordinate.lat 
	 *	coordinate.lon 
	 *	coordinate.heading 
	 *	coordinate.speed	
	*/
	for ( var i = 1; i<= coords.length; i++)
	{
		var polyline = new GPolyline([
			new GLatLng( coords[i-1].lat, coords[i-1].lon ),
			new GLatLng( coords[i].lat, coords[i].lon )
		], "#ff0000", 10);
		
		map.addOverlay( polyline );		
	}	
}

//gets diff in meters between current location, passe as param, and last known location in localstorage
function distanceFromLastLocation(curLatitude, curLongitude) {
	console.log('distance from last location');
	var lastCoord = readLatestCoordinate();
	var distanceFromLast = calculateDistance(lastCoord.lat, lastCoord.long, curLatitude, curLongitude);
	console.log('distancefromlast'+distanceFromLast);
	return distanceFromLast;
}

//monkey patching for calculateDistance function
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

//copied off the web, returns distance in metres
function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad(); 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c;
  console.log('reached the end '+(d*1000));
  return d*1000; //modified to return m rathern than km
}
