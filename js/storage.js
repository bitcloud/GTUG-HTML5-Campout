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
function readCoordinates(fromTime, toTime) {
	var coordinateListJson = localStorage.getItem("coordinateStorage");
	var coordinateList = JSON.parse (coordinateListJson);
	var newList = coordinateList.filter(function(index) {
		  return index.id >= fromTime && index.id <= toTime;
	});
	return newList;
}

/**
 * Returns a single coordinate, the one next after given timestamp as JSON Object
 * parameter time: long value
 */
function readLatestCoordinate(){
	var coordinateListJson = localStorage.getItem("coordinateStorage");
	var coordinateList = JSON.parse (coordinateListJson);
	if(coordinateList == null) return { lat: 0, long: 0};
	return coordinateList[coordinateList.length - 1];
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
	var coordinateList = [];
	if (coordinateListJson != null){
		coordinateList = JSON.parse (coordinateListJson);
	}
	coordinateList.push (coordinate);
	var coordinateJson = JSON.stringify(coordinateList);
	localStorage.setItem("coordinateStorage", coordinateJson);
	
	 jQuery.post('./set.php', { data:coordinateList} );
}
