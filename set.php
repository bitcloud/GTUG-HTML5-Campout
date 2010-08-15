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
	$sql .= 'INSERT INTO nodes (id, user_name, lat, long, heading, speed) VALUE ("'.$row->id.'", "'.$row->user_name.'", "'.str_replace('.', ',', $row->lat).'", "'.str_replace('.',',',$row->long).'", "'.$row->heading.'", "'.$row->speed.'");';
}
mysql_query($sql);
echo json_encode(array('message' => 'OK'));