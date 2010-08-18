<?php
$options ['host'] = "xxxxxxxxxxxxx";
$options ['database'] = 'xxxxxxxxxxxxx';
$options ['user'] = 'xxxxxxxxxxxxx';
$options ['password'] = 'xxxxxxxxxxxxx';  


$db = mysql_connect($options['host'], $options['user'], $options['password']);
if(!$db) print_r(mysql_error());
mysql_select_db($options['database']);
$game_id = $_REQUEST['game_id'];
$playername = $_REQUEST['user_name'];
$timestamp = isset($_REQUEST['timestamp']) ? $_REQUEST['timestamp']:'';

$sql = 'SELECT o.user_name AS opponent
FROM lines2 p, lines2 o 
WHERE Intersects(p.line, o.line) = 1 AND p.game_id = 1 AND p.game_id = o.game_id
   AND p.user_name = "'.$playername.'" AND o.user_name != p.user_name';

$result = mysql_query($sql);
$gamestatus = array();
while($row = mysql_fetch_assoc($result)) {
	$gamestatus[] = $row;	
}


$sql = 'SELECT * FROM nodes WHERE game_id = "'.$game_id.'"'.(!empty($timestamp) ? ' AND inserted < "'.$timestamp.'"':'');
$result = mysql_query($sql);
$nodes = array();
while($row = mysql_fetch_assoc($result)) {
	$nodes[] = $row;
}
echo json_encode(array('gamestatus' => (count($gamestatus)>0 ? '1':'0') ,'error' => mysql_error(), 'message' => !mysql_error() ? 'OK':'Error', 'data' => json_encode($nodes)));