<?php
$options ['host'] = "localhost";
$options ['database'] = 'gtug_muc_campout';
$options ['user'] = 'gtug_muc_campout';
$options ['password'] = 'lovleybooks';  

$db = mysql_connect($options['host'], $options['user'], $options['password']);
if(!$db) print_r(mysql_error());
mysql_select_db($options['database']);