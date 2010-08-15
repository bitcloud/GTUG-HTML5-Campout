<?php
	$options['mapkey']['LIVE'] = 'ABQIAAAATpYyrRyzbARSAxuyTXETnBTO8FkhgOKBakegqmsTuK7gvuXozBQ1FBChyf7qb0pGtC8o9ydU54kyPA';
	$options['mapkey']['DEMO'] = 'ABQIAAAAZ1Z80H-gcuUBkSB3-l_CBRSlohPg15YjL7bcZvAGKyxlzbpwaBQJpIiy3yBxyfbERv7JHpIOW1YUDA'; 
?>
<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta charset="utf-8" />
	<link rel="apple-touch-icon" href="favicon-touch.png"/> 	
	<link rel="favicon" href="favicon.ico"/> 	
	<title>ReLoCoring</title>
	<meta name="apple-mobile-web-app-status-bar-style" content="black"  /> 	
	<meta content="yes" name="apple-mobile-web-app-capable" />
	<meta content="minimum-scale=1.0, width=device-width, maximum-scale=0.6667, user-scalable=no" name="viewport" />
	<link href="iwebkit/css/style.css" rel="stylesheet" media="screen" type="text/css" />
	<script src="iwebkit/javascript/functions.js" type="text/javascript"></script>
	<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=<?=$_SERVER['HTTP_HOST']=='webdev.io-labs.de'?$options['mapkey']['LIVE']:$options['mapkey']['DEMO'] ?>" type="text/javascript"></script>	
	<style>
		* { font-family: sans-serif; font-size: 14px; }
		a { color: red; }		
		body { margin: 0; padding: 0; background-color: black; color: white; }
		header { font-size: 16px; font-weight: bold; color: darkgray; border-bottom: 1px dotted darkgray; }
		
		#gmap { width: 100%; height: 500px; }
		#functions { position: absolute; width: 50%; height: 64px; bottom: 48px; left: 25%; }
		#functions button { height: 32px; }
		.bg { position: absolute; left: 0; top: 0; width: 100%; height: 64px; background-color: black; filter: alpha(opacity=50);-moz-opacity: 0.5; opacity: 0.5; border-radius: 20px; -moz-border-radius: 20px; -webkit-border-radius: 20px; }
		.fg { position: absolute; left: 16px; top: 16px;  }
		
		#debug { position: absolute; left:0; top: 32px; }
		.debug { width: 100%; height: 32px; }
		#debug table { width: 100% }
		#debug td { width: 33% }
		
		
		#playerMe { position: absolute; left: 0; bottom: 0; }
		#playerEnemy { position: absolute; right: 0; bottom: 0;}
		.player { width: 96px; height: 128px; }
		
		.playerBg  { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: black; filter: alpha(opacity=50);-moz-opacity: 0.5; opacity: 0.5; }
		  .bgMe    { border-top-right-radius: 16px; -moz-border-top-right-radius: 16px; -webkit-border-top-right-radius: 16px;}
		  .bgEnemy { border-top-left-radius: 16px;  -moz-border-top-left-radius: 16px;  -webkit-border-top-left-radius: 16px;}

		.playerFg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
		.playerFg img { margin-left: 8px; margin-top: 8px; border: 1px solid white; padding: 2px; }
		.playerFg div, .playerFg span { margin-left: 8px; margin-top: 8px;  }
		
	</style>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/geo.js"></script>
  <script src="js/gmap.js"></script>
<script>
game = { id: 1 };
opponent = [{name: 'Markus', color: 'green' } ];

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
</script>  
</head> 