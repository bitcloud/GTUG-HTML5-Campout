/*
 * Geo functions to be called by client html page
 */

//periodically stores current location, to be called on document.ready
function periodicallyUpdateLocation(){
	var interval = 1000 * 20; //one minute
	setInterval(intervalCaller,interval);
}

/**
 * Collect all periodically methods to call
 *
 */
function intervalCaller()
{	
	storeCurrentLocation();
	readAllLocations();
}


// determine current position, and write it to local storage
function storeCurrentLocation(){
	var thresholdInMeters = 30;
	navigator.geolocation.getCurrentPosition(function(position) {
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
function readAllLocations()
{
	var fromTime = new Date();
	var coords = readCoordinates( fromTime, fromTime - 1000 * 60 * 60 ) // coords from one hour
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
	var lastCoord = readLatestCoordinate();
	var distanceFromLast = calculateDistance(lastCoord.latitude, lastCoord.longitude, curLatitude, curLongitude);
	
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
  return d*1000; //modified to return m rathern than km
}