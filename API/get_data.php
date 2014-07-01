<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script return a json object with contains the info to build the node tree,
 * you must specify the entyty, the level of depth (how many time computes the sons of sons),
 * and the criterion of similarity (type of similarity to take in consideration).
 */

require_once 'config.php';

$similarity=json_decode($_POST['similarity']);
$len_similarity = count($similarity);

$search_option = "false ";

for($i=0; $i<$len_similarity; $i++){
	if($similarity[$i]>=0)
		$search_option = $search_option.'OR id_criterion="'.mysqli_escape_string($con, $similarity[$i]).'" ';
	else
		$search_option = $search_option."OR false ";
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
	global $search_option;

	$sql_get_child_pt1 = "SELECT id_entityend AS id, similarity.value AS my_weight FROM similarity WHERE id_entitystart=".'"'.$id_to_search.'"'."AND (".$search_option.")";
	$sql_get_child_pt2 = "SELECT id_entitystart AS id, similarity.value AS my_weight FROM similarity WHERE id_entityend=".'"'.$id_to_search.'"'."AND (".$search_option.")";
	$sql_get_child = $sql_get_child_pt1." UNION ".$sql_get_child_pt2.";";
	
	return $sql_get_child;
}

function get_node($id_to_search, $weight, $father, $depth){
	global $con;
	$json='';
	
	$name = get_name_by_id($id_to_search);
	$json = '{"id":"'.$id_to_search.'",';
	$json = $json.'"name":"'.$name.'",';
	$json = $json.'"data":{"my_weight":"'.$weight.'"},';
	$json = $json.'"children":[';
	
	$child = array();
	$sql_get_child = query_get_child($id_to_search);
	$result = mysqli_query($con, $sql_get_child);

	if ($depth > 0){
		if(mysqli_num_rows($result)>0){
			while ($obj = mysqli_fetch_object($result))
		 		$child[] = $obj;
			foreach($child as $row)
				if ($row->id != $father)
					$json=$json.get_node($row->id, $row->my_weight, $id_to_search, $depth-1).",";
			if (substr($json,-1,1)==',')
				$json = substr($json,0,-1);
		}
	}
	
	$json = $json.']}';
	return $json;
}

echo get_node($id_to_search,1,$id_to_search,$depth);
?>