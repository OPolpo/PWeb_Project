<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return all'entities in the database that have some property value like the searched value
 */

require_once 'config.php';

$q = mysqli_escape_string($con,$_POST["q"]);
$per_page = mysqli_escape_string($con,$_POST["per_page"]);
$page_number = mysqli_escape_string($con,$_POST["page_number"]);
$start_from = $per_page * $page_number;

function search(){
 	global $con, $q, $per_page, $start_from;
 	$sql_search='SELECT value_property AS name, id_entity AS id FROM entity_property WHERE id_property=1 AND id_entity IN (SELECT id_entity AS id FROM entity_property WHERE value_property LIKE "%'.$q.'%") LIMIT '.$start_from.','.$per_page.';';
 	$id_list = array();
 	$result = mysqli_query($con, $sql_search);
 	while ($obj = mysqli_fetch_object($result))
 		$id_list[] = $obj;
 	return json_encode($id_list);
}

echo search();
?>