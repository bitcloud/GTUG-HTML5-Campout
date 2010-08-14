<?php require 'header.php'; ?>
	<body>
	
		<div id="topbar" style="margin-bottom: 0px;"> 
			<div id="title"><div id="matchName">ReLoCoring: Matchname</div></div>
			<div id="leftnav"><a href="index.php">Men&uuml;</a></div>
			<div id="rightnav"><a href="stats.php">Statistik</a></div>			
		</div>	
			
		<div id="gmap"></div>
		<div id="player"></div>
		
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