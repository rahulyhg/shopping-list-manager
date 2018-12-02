<?php
/**
 * INIT
 * Basic Configuration settings
 */

// Test User id
$userID = 2;

// database settings
$server = 'localhost';
$user = 'homestead';
$pass = 'secret';
$db = 'shopping';
$Database = new mysqli($server, $user, $pass, $db);

if ($Database->connect_error) {
	die("Connection failed: " . $Database->connect_error);
}

// ***** DEV ONLY ****
mysqli_report(MYSQLI_REPORT_ERROR);  // ***** DEV ONLY ****
ini_set('display_errors', 1);  // ***** DEV ONLY ****

// include objects
include ('app/api.php');
include('app/connection.php');

// Init classes
$Connection = new Connection($Database);
$Api = new Api($Connection); // TODO USERID HERE

/**
 * Requests Controller
 */

// Get ID
$itemId = 0;

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
	$itemId = intval($_GET['id']);
}

$request_method=$_SERVER["REQUEST_METHOD"];

if ($request_method === 'GET') {
	if ($itemId != 0) {
		$Api->getItem($itemId, $userID);
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
else {
	header("HTTP/1.0 405 Method Not Allowed");
}