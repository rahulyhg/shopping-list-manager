<?php
 /**
  * INIT
  * Basic Configuration settings
  */

$userID = 2;

// database settings
$server = 'localhost';
$user = 'homestead';
$pass = 'secret';
$db = 'shopping';
$Database = new mysqli($server, $user, $pass, $db);

// error reporting *DEBUGGING ONLY*
mysqli_report(MYSQLI_REPORT_ERROR);
ini_set('display_errors', 1);
// error reporting *DEBUGGING ONLY*

// include objects
include ('api.php');

// Init classes
$Api = new Api($Database, $userID);

// Requests Controller
$request_method=$_SERVER["REQUEST_METHOD"];

if ($request_method === 'GET') 
{
	$Api->get_all_items($userID);
}
elseif ($request_method === 'POST') 
{
	$Api->insert_item($userID);
}
elseif ($request_method === 'PUT') 
{
	$Api->update_item();
}
elseif ($request_method === 'DELETE') 
{
	$Api->delete_item();
}
else
{
	header("HTTP/1.0 405 Method Not Allowed");
}