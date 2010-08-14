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
function readCoordinates(from, to) {
	var coordinateListJson = localStorage.getItem("coordinateStorage");
	var coordinateList = JSON.parse (coordinateListJson);
	var newList = coordinateList.filter(function(index) {
		  return index.id >= from && index.id <= to;
	})
	return newList;
}

/**
 * Returns a single coordinate, the one next after given timestamp as JSON Object
 * parameter time: long value
 */
function readNextCoordinate (time){
	
}

/**
 * Writes a coordinate to the locale storage
 */
function writeCoordinate (latitude, longitude){
	var coordinate = new Object ();
	var timestamp = new Date().getTime();
	coordinate.id = timestamp;
	coordinate.lat = latitude;
	coordinate.lon = longitude;
	
	var coordinateListJson = localStorage.getItem("coordinateStorage"); 
	if (coordinateListJson == null){
		coordinateListJson = "";
	}
	var coordinateList = JSON.parse (coordinateListJson);
	coordinateList.push (coordinate);
	var coordinateJson = JSON.stringify(coordinateList);
	localStorage.setItem("coordinateStorage", coordinateJson); 
}
