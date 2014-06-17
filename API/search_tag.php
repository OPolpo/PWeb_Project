<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return all'entities in the database that have the tag searched
 */

$mysql_db_hostname = "localhost";
$mysql_db_user = "webuser";
$mysql_db_password = "dummypass";
$mysql_db_database = "p_web";

//ini_set("display_errors",1);

$tag = $_POST["tag"];
$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database);
if (!$con){
	trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
}

function get_elem_by_tag($tag_to_search){
 	global $con;
 	$sql_get_tag="SELECT entity.id AS id, entity_property.value_property AS name FROM entity_property JOIN entity ON entity.id = entity_property.id_entity JOIN property_type ON entity_property.id_property = property_type.id JOIN tag ON tag.id_entity = entity.id WHERE id_property=1 AND tag_value=".'"'.$tag_to_search.'";';
 	$id_list = array();
 	$result = mysqli_query($con, $sql_get_tag);
 	while ($obj = mysqli_fetch_object($result))
 		$id_list[] = $obj;
 	//return '{"search":'.json_encode($id_list)."}";
 	return json_encode($id_list);
}

echo get_elem_by_tag(mysqli_escape_string($con,$tag));
?>