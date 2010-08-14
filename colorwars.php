<?php require 'header.php'; ?>
	<body>
		<div id="topbar" style="margin-bottom: 0px;"> 
			<div id="title"><div id="player"></div></div> 
		</div> 		
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