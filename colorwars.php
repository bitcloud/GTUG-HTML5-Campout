<?php require 'header.php'; ?>
	<body>
	
		<div id="topbar" style="margin-bottom: 0px;"> 
			<div id="title"><div id="matchName">ReLoCoring: Matchname</div></div>
			<div id="leftnav"><a href="index.php">Men&uuml;</a></div>
			<div id="rightnav"><a href="stats.php">Statistik</a></div>			
		</div> 	
		
		<div id="gmap"></div>
		<div id="debug" class="debug">
			<div class="playerBg bgMe">
			<table>
			<tr>
			<td>CallBack Response: <div id="message"></div></td>
			<td>currentLat <div id="currentLat"></div></td>
			<td>currentLong <div id="currentLong"></div></td>
			</tr>
			</table>
			</div>
		</div>
		
		<div id="playerMe" class="player">
			<div class="playerBg bgMe"></div>
			<div class="playerFg">
				<img src="iwebkit/avatar-nils.jpg" />
				<div id="player"><?=$_GET['playername']?></div>
				<span>750 qm</span>
				<form><input id="locateSwitch" name="locateSwitch" type="checkbox" /></form>
				
			</div>
		</div>
		
		<div id="playerEnemy" class="player">
			<div class="playerBg bgEnemy"></div>
			<div class="playerFg">
				<img src="iwebkit/avatar-jan.jpg" />
				<div>Jan</div>
				<span>637 qm</span>
			</div>
		</div>
		
		<script>
		jQuery(document).ready(function(){
			jQuery('#player').html(gup('playername'));
			player = {
				name: gup('playername')
			}; 
			localStorage.clear();
			initialize();
			showMe();
			periodicallyUpdateLocation();
		});
		</script>
	</body>  
</html> 