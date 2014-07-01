<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return all'entities in the database that have the tag searched
 */

require_once 'config.php';

$q = mysqli_escape_string($con,$_GET["q"]);
$per_page = mysqli_escape_string($con,$_GET["per_page"]);
$page_number = mysqli_escape_string($con,$_GET["page_number"]);
$start_from = $per_page * $page_number;

function get_elem_by_tag(){
 	global $con, $q, $per_page, $start_from;
 	$sql_get_tag='SELECT entity.id AS id, entity_property.value_property AS name FROM entity_property JOIN entity ON entity.id = entity_property.id_entity JOIN property_type ON entity_property.id_property = property_type.id JOIN tag ON tag.id_entity = entity.id WHERE id_property=1 AND tag_value="'.$q.'" LIMIT '.$start_from.','.$per_page.';';
 	$tag_list = array();
 	$result = mysqli_query($con, $sql_get_tag);
 	while ($obj = mysqli_fetch_object($result))
 		$tag_list[] = $obj;
 	return json_encode($tag_list);
}

echo get_elem_by_tag();
?>