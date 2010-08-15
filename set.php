<?php
$options ['host'] = "localhost";
$options ['database'] = 'gtug_muc_campout';
$options ['user'] = 'gtug_muc_campout';
$options ['password'] = 'lovleybooks';  

$db = mysql_connect($options['host'], $options['user'], $options['password']);
if(!$db) print_r(mysql_error());
mysql_select_db($options['database']);
$data = json_decode($_REQUEST['data']);

$sql = '';
foreach($data as $row) {
	$sql = 'INSERT INTO nodes (id, user_name, `lat`, `long`, heading, speed, game_id, location) VALUE ("'.$row->id.'", "'.$row->user_name.'", "'.$row->lat.'", "'.$row->long.'", "'.(is_null($row->heading) ? 0:$row->heading).'", "'.(is_null($row->speed) ? 0:$row->speed).'", '.$row->game_id.',PointFromText("POINT('.$row->lat.' '.$row->long.')"));';
	mysql_query($sql);
}
echo json_encode(array('error' => mysql_error(), 'message' => !mysql_error() ? 'OK':'Error'));