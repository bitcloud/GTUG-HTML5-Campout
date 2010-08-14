<?php require 'header.php'; ?>
	<body>
		<div id="player"></div> 		
		<div id="gmap"></div>
		<script>
		jQuery(document).ready(function(){
			jQuery('#player').html(gup('playername'));
			initialize();
			showMe();
			periodicallyUpdateLocation();
		});
		</script>
	</body>  
</html> 