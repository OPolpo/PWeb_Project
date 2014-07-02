<?php
/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This is a simple configuration file, to perform the connection to the DB
 */

$mysql_db_hostname = "localhost";
$mysql_db_user = "webuser";
$mysql_db_password = "dummypass";
$mysql_db_database = "p_web";

//ini_set("display_errors",1);

$con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password, $mysql_db_database);
if (!$con)
	trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());

?>