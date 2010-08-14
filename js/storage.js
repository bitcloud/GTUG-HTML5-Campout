/** 
 * contains methods for reading and writing gps coordinates from and to the local storage. 
 * A coordinate contains a timestamp, the latitude and the longitude 
 * 
 * 
 * **/

/**
 * Returns a list of coordinates as JSON objects, which timestamps are contained in the interval
 * between 'fromTime' and 'toTime'. 
 * parameter from: long value
 * parameter to: long value
 */
function readCoordinates(var from, var to) {
	
}

/**
 * Returns a single coordinate, the one next after given timestamp as JSON Object
 * parameter time: long value
 */
function readNextCoordinate (var time){
	
}

/**
 * Writes a coordinate to the locale storage
 */
function writeCoordinate (var latitude, var longitude){
	var timestamp = new Date().getTime();
	var coordinate = new Object ();
	coordinate.id = timestamp;
	coordinate.lat = latitude;
	coordinate.lon = longitude;
	var coordinateJson = JSON.stringify(coordinate);
	localStorage.setItem(timestamp, coordinateJson); 
}
