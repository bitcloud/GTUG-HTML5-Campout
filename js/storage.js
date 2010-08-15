/** 
 * contains methods for reading and writing gps coordinates from and to the local storage. 
 * A coordinate contains a timestamp, latitude, longitude, heading and speed.
 *  
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

function readOpponentCoordinates(fromTime, toTime, playerName) {
	var coordinateListJson = localStorage.getItem("gameDataStorage");
	var coordinateList = JSON.parse (coordinateListJson);
	var newList = coordinateList.filter(function(index) {
		return index.id <= toTime && index.user_name == playerName;
		// index.id >= fromTime && index.id <= toTime && 
	});
	return newList;
}


/**
 * Returns a single coordinate, the one next after given timestamp as JSON Object
 * coordinate.id = timestamp;
 *	coordinate.lat 
 *	coordinate.lon 
 *	coordinate.heading 
 *	coordinate.speed 
	
	parameter time: long value.
 */
function readLatestCoordinate(){
	var coordinateListJson = localStorage.getItem("coordinateStorage");
	var coordinateList = JSON.parse (coordinateListJson);	
	if(coordinateList == null) return { lat: 0, long: 0};
	return coordinateList[coordinateList.length - 1];
}

function syncStorage() {
	jQuery.get('./get.php', { game_id: game.id, user_name: player.name }, function(data) {
		var response = JSON.parse(data);
		if(response.gamestatus=="1") alert('YOU LOST');
		localStorage.setItem("gameDataStorage", response.data);
	});
}

/**
 * Writes a coordinate to the locale storage
 */
function writeCoordinate (latitude, longitude, heading, speed){
	
	console.log('write');
	
	if (heading == null || heading == undefined){
		heading = 0;
	}
	
	if (speed == null || speed == undefined){
		speed = 0;
	}
	speed = 0;
	heading = 0;
	var coordinate = new Object ();
	var timestamp = new Date().getTime();
	
	coordinate.id = timestamp;
	coordinate.user_name = player.name;
	coordinate.game_id = game.id;
	coordinate.lat = latitude;
	coordinate.long = longitude;
	coordinate.heading = heading;
	coordinate.speed = speed;
	
	jQuery('#currentLat').html(coordinate.lat);
	jQuery('#currentLong').html(coordinate.long);
	
	var coordinateListJson = localStorage.getItem("coordinateStorage"); 
	var coordinateList = [];
	if (coordinateListJson != null){
		coordinateList = JSON.parse (coordinateListJson);
	}
	coordinateList.push (coordinate);
	var coordinateJson = JSON.stringify(coordinateList);
	localStorage.setItem("coordinateStorage", coordinateJson);
	
	jQuery.post('./set.php',  { data: coordinateJson} , function(data) {
		var response = JSON.parse(data);
		jQuery('#message').html(response.message);
	});
}