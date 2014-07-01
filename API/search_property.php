<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return all'entities in the database that have some property value like the searched value
 */

require_once 'config.php';

$q = $_POST["q"];
$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database);
if (!$con){
	trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
}

function search($search){
 	global $con;
 	$sql_search='SELECT value_property AS name, id_entity AS id FROM entity_property WHERE id_property=1 AND id_entity IN (SELECT id_entity AS id FROM entity_property WHERE value_property LIKE "%'.$search.'%");';
 	$id_list = array();
 	$result = mysqli_query($con, $sql_search);
 	while ($obj = mysqli_fetch_object($result))
 		$id_list[] = $obj;
 	//return '{"search":'.json_encode($id_list)."}";
 	return json_encode($id_list);
}

echo search(mysqli_escape_string($con,$q));
?>