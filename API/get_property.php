<?php
$mysql_db_hostname = "localhost";
$mysql_db_user = "webuser";
$mysql_db_password = "dummypass";
$mysql_db_database = "p_web";

//ini_set("display_errors",1);

$id = $_POST["id"];

$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database);
if (!$con){
	trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
}

function get_elem_by_tag($id){
 	global $con;
 	mysqli_set_charset($con, 'utf8');
 	$sql_get_property="SELECT id_entity AS id, value_property AS p_value, name_property AS p_name FROM p_web.entity_property JOIN property_type ON id_property=id where id_entity=".'"'.$id.'";';

 	$id_list = array();
 	$result = mysqli_query($con, $sql_get_property);
 	while ($obj = mysqli_fetch_object($result))
 		$id_list[] = $obj;
 	return json_encode($id_list);
}

echo get_elem_by_tag(mysqli_escape_string($con,$id));
?>