<?php

/**
 * API's CRUD Item requests
 */
class Api  {
	private $connection;
	// private $userId;
	private $response;

	public function __construct($connection) {
		$this->connection = $connection;
		$this->response = Array();
	}

	/**
	 * GET All items Request
	 * @param string $userId for the user we want to fetch
	 * #returns JSON
	 */
	public function getAllItems(int $userid) {
		$sql = "SELECT * FROM items WHERE userId=". $userid . " ORDER BY id";
		$query = $this->connection->query($sql);

		if ($query) {
			$this->response = $query->fetchAll();		
			$query->closeConnection();
			$this->ifEmptySetResponseMsg();
		} else {
			$this->response = Array(
				'id'	=> $this->mysqli->insert_id,
				'status' => 'error',
				'message' => 'Get Items failed.'
			);
		}

		$this->returnResponse();
	}

	/**
	 * GET Single item Request
	 */
	public function getItem(int $id ,int $userid) {
		$sql = "SELECT * FROM items WHERE id=? AND userId=? LIMIT 1";
		$types = "ii";
		$vars = [$id ,$userid];
		$query = $this->connection->query($sql, $types, $vars);

		if ($query) {
			$this->response = $query->fetchSingle(); // Only one will be returned, and we select that	
			$query->closeConnection();			
			$this->ifEmptySetResponseMsg();
		} else {
			$this->response = Array(
				'status' => 'error',
				'message' => 'Get Items failed.'
			);
		}

		$this->returnResponse();
	}

	/**
	 * POST Request
	 * @param int $userId for the user we want to add this item
	 * #returns JSON
	 */
	public function insertItem(int $userId) {
		$post_vars = json_decode(file_get_contents("php://input"), true);
		$name = $post_vars["name"];
		$amount = $post_vars["amount"];
		$inCart = $post_vars["inCart"];

		$sql = "INSERT INTO items (name, amount, inCart, userId) VALUES (?, ?, ?, ?)";
		$types = "sisi";
		$vars = [$name, $amount, $inCart, $userId];
		$query = $this->connection->query($sql, $types, $vars);

		if ($query) {
			$this->response = Array(
				'id'	=> $this->connection->getLastInsertedId(),
				'status' => 'success',
				'message' => 'Item Added Successfully.'
			);
			$query->closeConnection();
		} else {
			$this->response = Array(
				'status' => 'error',
				'message' =>'Item Addition Failed.'
			);
		}

		$this->returnResponse();
	}

	/**
	 * PUT Request
	 * #returns JSON
	 */
	public function updateItem() {
		$put_vars = json_decode(file_get_contents("php://input"), true);
		$id = $put_vars["id"];
		$name = $put_vars["name"];
		$amount = $put_vars["amount"];
		$inCart = $put_vars["inCart"];

		$sql = "UPDATE items SET name=?, amount=?, inCart=? WHERE id =?";
		$types = "sisi";
		$vars = [$name, $amount, $inCart, $id];
		$query = $this->connection->query($sql, $types, $vars);

		if ($query) {
			$this->response = Array(
				'status' => 'success',
				'message' => 'Item Updated Successfully.'
			);
			$query->closeConnection();
		} else {
			$this->response = Array(
				'status' => 'error',
				'message' => 'Item Update Failed.'
			);
		}

		$this->returnResponse();
	}

	/**
	 * DELETE Request
	 * #returns JSON
	 */
	public function deleteItem() {
		$del_vars = json_decode(file_get_contents("php://input"), true);
		$id = $del_vars["id"];

		$sql = "DELETE FROM items WHERE id=?";
		$types = "i";
		$vars = [$id];
		$query = $this->connection->query($sql, $types, $vars);

		if ($query) {
			$this->response = Array(
				'status' => 'success',
				'message' => 'Item Deleted Successfully.'
			);
			$query->closeConnection();
		} else {
			$this->response = Array(
				'status' => 'error',
				'message' =>'Item Delete Failed.'
			);
		}

		$this->returnResponse();
	}
	
	// Common helpers
	private function returnResponse() {
		// header("Access-Control-Allow-Origin: *"); // ***** DEV ONLY ****
		// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // ***** DEV ONLY 
		// header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Allow-Headers: Content-Type');
		header('Content-Type: application/json');
		echo json_encode($this->response);
	}

	private function ifEmptySetResponseMsg() {
		if (!$this->response) {
			$this->response = Array(
				'status' => 'Success',
				'message' => 'No items to show!'
			);
		}
	}
}