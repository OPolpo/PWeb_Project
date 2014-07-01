<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return all property if a specified entity
 */

require_once 'config.php';


$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database);
if (!$con){
	trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
}

function get_criterion($id){
 	global $con;
 	mysqli_set_charset($con, 'utf8');
 	$sql_get_property="SELECT coefficient_name as name, id_criterion as id FROM criterion;";
 	$criterion_list = array();
 	$result = mysqli_query($con, $sql_get_property);
 	while ($obj = mysqli_fetch_object($result))
 		$criterion_list[] = $obj;
 	return json_encode($criterion_list);
}

echo get_criterion();
?>