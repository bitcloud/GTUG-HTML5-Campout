<?php require 'header.php'; ?>
	<body onload="initialize()";>
		<div id="player"></div> 		
		<div id="gmap"></div>
		<div id="functions">
			<div class="bg"></div>
			<div class="fg">
				<button type="button" onclick="showMe();">showMe()</button>
				<button type="button" onclick="updateMe( DEFAULT_LAT+0.01, DEFAULT_LNG+0.005 );">updateMe()</button>
				<button type="button" onclick="demoLine();">demoLine()</button>
				<button type="button" onclick="demoPolygon();">demoPolygon()</button>
				
			</div>
		</div>		
		<script>
		jQuery(document).ready(function(){
			jQuery('#player').html(gup('playername'));
			periodicallyUpdateLocation();
		});
		</script>
	</body>  
</html> 