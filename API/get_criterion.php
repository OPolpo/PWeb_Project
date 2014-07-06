<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return all property if a specified entity
 */

require_once 'config.php';

function get_criterion(){
 	global $con;
 	mysqli_set_charset($con, 'utf8');
 	$sql_get_criterion="SELECT coefficient_name as name, id_criterion as id FROM criterion;";
 	$criterion_list = array();
 	$result = mysqli_query($con, $sql_get_criterion);
 	while ($obj = mysqli_fetch_object($result))
 		$criterion_list[] = $obj;
 	return json_encode($criterion_list);
}

echo get_criterion();
?>