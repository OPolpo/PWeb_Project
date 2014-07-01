<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return all property if a specified entity
 */

require_once 'config.php';

$id = $_POST["id"];

function get_elem_by_tag($id){
 	global $con;
 	mysqli_set_charset($con, 'utf8');
 	$sql_get_property="SELECT id_entity AS id, value_property AS p_value, name_property AS p_name FROM entity_property JOIN property_type ON id_property=id where id_entity=".'"'.$id.'";';

 	$id_list = array();
 	$result = mysqli_query($con, $sql_get_property);
 	while ($obj = mysqli_fetch_object($result))
 		$id_list[] = $obj;
 	return json_encode($id_list);
}

echo get_elem_by_tag(mysqli_escape_string($con,$id));
?>