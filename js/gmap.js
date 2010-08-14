/** 
 * Google maps interface 
 * - initialize()
 * - showMe()
 * - updateMe() 
 *
 * **/
 
var DEFAULT_ZOOM = 15;
var DEFAULT_LAT  = 48.1498669;
var DEFAULT_LNG  = 11.5615340; 


// ********************************************************

var map = null;
var geocoder = null;
var markerImage =  "avatare/unknow.jpg";
var markerShadow = "avatare/unknow.jpg";  

var marker = null;   

/**
 * Returns a single coordinate, the one next after given timestamp as JSON Object
 * parameter time: long value
 */
function initialize() {
	document.getElementById( 'gmap' ).style.height = window.innerHeight + 'px';
	if (GBrowserIsCompatible()) {
	    map = new GMap2(document.getElementById("gmap"));
	    map.setCenter(new GLatLng( DEFAULT_LAT, DEFAULT_LNG ), DEFAULT_ZOOM );
	    map.addControl(new GSmallMapControl());
	    geocoder = new GClientGeocoder();
	    
		/*
	    markerIcon = new GIcon();
	    markerIcon.image = markerImage;
	    markerIcon.shadow = markerShadow;
	    markerIcon.shadowSize = new GSize(70, 38);
	    markerIcon.iconAnchor = new GPoint(23, 30);       // new GPoint(6, 39);
	    markerIcon.infoWindowAnchor = new GPoint(23, 30); // new GPoint(50, - 2);     
		*/
		
		// @TODO mockup values
	    lat = DEFAULT_LAT;
	    lng = DEFAULT_LNG;
	  
	    point = new GLatLng( lat, lng );    	
	    map.setCenter( point, DEFAULT_ZOOM );
	}
}


/**
 * Initially shows local player in map
 */
function showMe()
{
	// @TODO mockup values
    lat = DEFAULT_LAT;
    lng = DEFAULT_LNG;

	point = new GLatLng( lat, lng );
	map.panTo( point, DEFAULT_ZOOM );
    marker = new GMarker( point );
    map.addOverlay( marker );	
}


/**
 * Updates map and marker by panning and setting the new marker position
 * parameter lat: float latitude for new position
 * parameter lng: float longitude f�r new position
 */
function updateMe( lat, lng )
{	
	point = new GLatLng( lat, lng );
	map.panTo( point, DEFAULT_ZOOM );	
	
	map.removeOverlay( marker );
    marker = new GMarker( point );
    map.addOverlay( marker );			
}


/**
 * Demo for drawing a line in the gmap
 */
function demoLine()
{
	var polyline = new GPolyline([
		new GLatLng( DEFAULT_LAT, DEFAULT_LNG ),
		new GLatLng( DEFAULT_LAT+0.01, DEFAULT_LNG+0.005 )
	], "#ff0000", 10);
	
	map.addOverlay( polyline );
}


/**
 * Demo for drawing a line in the gmap
 */
function demoPolygon()
{
	var latOffset = 0.01;
	var lonOffset = 0.01;

	var polygon = new GPolygon([
	    new GLatLng( DEFAULT_LAT, DEFAULT_LNG - lonOffset),
	    new GLatLng( DEFAULT_LAT + latOffset, DEFAULT_LNG),
	    new GLatLng( DEFAULT_LAT, DEFAULT_LNG + lonOffset),
	    new GLatLng( DEFAULT_LAT - latOffset, DEFAULT_LNG),
	    new GLatLng( DEFAULT_LAT, DEFAULT_LNG - lonOffset) // identic with first - filled area!
	], "#f33f00", 5, 1, "#ff0000", 0.2);
	
	map.addOverlay( polygon );
}