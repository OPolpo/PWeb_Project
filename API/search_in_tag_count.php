<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script Count all'entities in the database that have the tag searched
 */

require_once 'config.php';

$q = mysqli_escape_string($con,$_POST["q"]);

function get_elem_by_tag(){
 	global $con, $q, $per_page, $start_from;
 	$sql_get_tag='SELECT count(*) AS number FROM entity_property JOIN entity ON entity.id = entity_property.id_entity JOIN property_type ON entity_property.id_property = property_type.id JOIN tag ON tag.id_entity = entity.id WHERE id_property=1 AND tag_value="'.$q.'";';
 	$result = mysqli_query($con, $sql_get_tag);
 	$obj = mysqli_fetch_object($result);
 	return json_encode($obj);
}

echo get_elem_by_tag();
?>