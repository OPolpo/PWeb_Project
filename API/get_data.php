<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return a json object with contains the info to build the node tree,
 * you must specify the entyty, the level of depth (how many time computes the sons of sons),
 * and the criterion of similarity (type of similarity to take in consideration).
 */

$mysql_db_hostname = "localhost";
$mysql_db_user = "webuser";
$mysql_db_password = "dummypass";
$mysql_db_database = "p_web";

//ini_set("display_errors",1);

$id = $_POST["id"];
$depth = $_POST["depth"];
$family = $_POST["family"];
$friends = $_POST["friends"];
$colleagues = $_POST["colleagues"];


$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database);
if (!$con){
	trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
}

function get_name_by_id($id_to_search){
	global $con;
	$sql_get_name = "SELECT value_property FROM entity_property JOIN entity ON entity.id = entity_property.id_entity JOIN property_type ON entity_property.id_property = property_type.id WHERE name_property='name' AND entity.id=".'"'.$id_to_search.'";';
	$name = mysqli_fetch_row(mysqli_query($con, $sql_get_name));
	if (sizeof($name)==1)
		$name=$name[0];
	else
		$name="NAME_ERROR_".sizeof($name)."_NAME_EXIST";
	return $name;

}

function query_get_child($id_to_search){

	global $family, $friends, $colleagues;

	$search_option = "";
	if($family)
		$search_option = $search_option.' id_criterion="1" ';
	else
		$search_option = $search_option." false ";
	if($friends)
		$search_option = $search_option.' OR id_criterion="2" ';
	else
		$search_option = $search_option." OR false ";
	if($colleagues)
		$search_option = $search_option.' OR id_criterion="3" ';
	else
		$search_option = $search_option." OR false ";

	$sql_get_child_pt1 = "SELECT id_entityend AS id, similarity.value AS my_weight FROM similarity WHERE id_entitystart=".'"'.$id_to_search.'"'."AND (".$search_option.")";
	$sql_get_child_pt2 = "SELECT id_entitystart AS id, similarity.value AS my_weight FROM similarity WHERE id_entityend=".'"'.$id_to_search.'"'."AND (".$search_option.")";
	$sql_get_child = $sql_get_child_pt1." UNION ".$sql_get_child_pt2.";";
	
	return $sql_get_child;

}


function get_node($id_to_search, $weight, $father){
	global $con;
	$name = get_name_by_id($id_to_search);
	$json = '{"id":"'.$id_to_search.'",';
	$json = $json.'"name":"'.$name.'",';
	$json = $json.'"data":{"my_weight":"'.$weight.'"},';
	$json = $json.'"children":[';
	
	$child = array();

	$sql_get_child = query_get_child($id_to_search);

	$result = mysqli_query($con, $sql_get_child);
	if(mysqli_num_rows($result)>0){
		while ($obj = mysqli_fetch_object($result)){
			$child[] = $obj;
		}
		foreach($child as $row){
			if ($row->id != $father){
				$id_child = $row->id;
				$name_child=get_name_by_id($id_child);
				$my_weight_child = $row->my_weight;
				$json = $json.'{"id":"'.$id_child.'","name":"'.$name_child.'","data":{"my_weight":'.$my_weight_child.'},"children":[]},';
			}
		}
		if (substr($json,-1,1)==',')
			$json = substr($json,0,-1).']},';
		else
			$json = $json.']},';
	}
	return $json;
}

function get_node_recursive($id_to_search, $weight, $father, $depth){
	global $con;
	$json='';
	if ($depth > 0){
		$name = get_name_by_id($id_to_search);
		$json = '{"id":"'.$id_to_search.'",';
		$json = $json.'"name":"'.$name.'",';
		$json = $json.'"data":{"my_weight":"'.$weight.'"},';
		$json = $json.'"children":[';
	
		$child = array();
		
		$sql_get_child = query_get_child($id_to_search);

		$result = mysqli_query($con, $sql_get_child);
		if(mysqli_num_rows($result)>0){
			while ($obj = mysqli_fetch_object($result)){
				$child[] = $obj;
			}
			foreach($child as $row){
				if ($row->id != $father)
					$json=$json.get_node_recursive($row->id, $row->my_weight, $id_to_search, $depth-1);
			}
		}
		if (substr($json,-1,1)==',')
			$json = substr($json,0,-1).']},';
		else
			$json = $json.']},';
	}
	else
		$json=$json.get_node($id_to_search, $weight, $father);

	return $json;
}

function get_node_to_depth($id_to_search, $depth){
	global $con, $family, $friends, $colleagues;
	$id_to_search=mysqli_escape_string($con, $id_to_search);
	$depth=mysqli_escape_string($con, $depth);
	$family=mysqli_escape_string($con, $family);
	$friends=mysqli_escape_string($con, $friends);
	$colleagues=mysqli_escape_string($con, $colleagues);
	return substr(get_node_recursive($id_to_search,1,$id_to_search,$depth),0,-1);
}

echo get_node_to_depth($id, $depth);
?>