<?php
/**
 * INIT
 * Basic Configuration settings
 */

// Test
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
include ('app/api.php');
include('app/connection.php');

// Init classes
$Connection = new Connection($Database);
$Api = new Api($Connection); // TODO USERID HERE

/**
 * Requests Controller
 */

$request_method=$_SERVER["REQUEST_METHOD"];

if ($request_method === 'GET') {
	if (isset($_GET['id'])) {
		$Api->getItem( $_GET['id'], $userID);
	} else {
		$Api->getAllItems($userID);
	}
}
elseif ($request_method === 'POST') {
	$Api->insertItem($userID);
}
elseif ($request_method === 'PUT') {
	$Api->updateItem();
}
elseif ($request_method === 'DELETE') {
	$Api->deleteItem();
}
else{
	header("HTTP/1.0 405 Method Not Allowed");
}