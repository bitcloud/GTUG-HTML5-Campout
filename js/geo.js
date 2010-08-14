/*
 * Geo functions to be called by client html page
 */

//periodically stores current location, to be called on document.ready
function periodicallyUpdateLocation() {
	var interval = 1000 * 60; //one minute
	setInterval(storeCurrentLocation,interval);
}


// determine current position, and write it to local storage
function storeCurrentLocation( {
	var thresholdInMeters = 30;

	navigator.geolocation.getCurrentPosition(function(position) {
	   var curLat = position.coords.latitude;
	   var curLong = position.coords.longitude;
	   if (distanceFromLastLocation(curLat,curLong > thresholdInMeters) ) {
	      writeCoordinate(lat,long);	
		
	   }

	}, function(error) {
	    alert('could not get position');
	});
	
}

//gets diff in meters between current location, passe as param, and last known location in localstorage
function distanceFromLastLocation(curLat, curLong) {
	var lastCoord = readLatestCoordinate();
	var distanceFromLast = calculateDistance(lastCoord.lat, lastCoord.long, curLat, curLong);
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

