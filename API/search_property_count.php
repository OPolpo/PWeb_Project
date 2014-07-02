<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script count all'entities in the database that have some property value like the searched value
 */

require_once 'config.php';

$q = mysqli_escape_string($con,$_POST["q"]);

function search(){
 	global $con, $q;
 	$sql_search='SELECT count(*) AS number FROM entity_property WHERE id_property=1 AND id_entity IN (SELECT id_entity AS id FROM entity_property WHERE value_property LIKE "%'.$q.'%");';
 	$result = mysqli_query($con, $sql_search);
 	$obj = mysqli_fetch_object($result);
 	return json_encode($obj);
}

echo search();
?>