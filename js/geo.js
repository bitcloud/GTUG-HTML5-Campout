/*
 * Geo functions to be called by client html page
 */

/*
 * determine current position, and write it to local storage
 */
function storeCurrentLocation() {

	navigator.geolocation.getCurrentPosition(function(position) {
	  writeCoordinate(position.coords.latitude, position.coords.longitude);
	}, function(error) {
	    alert('could not get position');
	});
	
}

