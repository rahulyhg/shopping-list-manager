<?php

/**
 * TODO CLEAN UP/REFACTORING
 */
class Api 
{
	private $Database;

	public function __construct($db) 
	{
		$this->Database = $db;
	}

	public function get_all_items($userid)
	{
		$response = Array();

		if ($stmt = $this->Database->query("SELECT * FROM items WHERE userId=". $userid . " ORDER BY id")) 
		{
			if ($stmt->num_rows > 0) 
			{
				while ($row = $stmt->fetch_assoc()) 
				{
					$response[]=$row;
				}
			}
		}

		header('Content-Type: application/json');
		echo json_encode($response);
	}

	public function insert_item($userId)
	{
		$response = Array();

		// Get POST vars
		$post_vars = json_decode(file_get_contents("php://input"), true);
		$name = $post_vars["name"];
		$amount = $post_vars["amount"];
		$inCart = $post_vars["inCart"];

		if ($stmt = $this->Database->prepare("INSERT INTO items (name, amount, inCart, userId) VALUES (?, ?, ?, ?)"))
	    {
		    $stmt->bind_param("sisi", $name, $amount, $inCart, $userId);
		    $stmt->execute();
			$stmt->close();
			
			$response = Array(
				'status' => 1,
				'status_message' =>'Item Added Successfully.'
			);
		}
		else
		{
			$response = Array(
				'status' => 0,
				'status_message' =>'Item Addition Failed.'
			);
		}

		header('Content-Type: application/json');
		echo json_encode($response);
	}

	public function update_item()
	{
		$response = Array();

		// Get PUT vars
		$put_vars = json_decode(file_get_contents("php://input"), true);
		$id = $put_vars["id"];
		$name = $put_vars["name"];
		$amount = $put_vars["amount"];
		$inCart = $put_vars["inCart"];

		if ($stmt = $this->Database->prepare("UPDATE items SET name=?, amount=?, inCart=? WHERE id =?"))
	    {
		    $stmt->bind_param("sisi", $name, $amount, $inCart, $id);
		    $stmt->execute();
			$stmt->close();
			
			$response = Array(
				'status' => 1,
				'status_message' =>'Item Updated Successfully.'
			);
		}
		else
		{
			$response = Array(
				'status' => 0,
				'status_message' =>'Item Update Failed.'
			);
		}

		header('Content-Type: application/json');
		echo json_encode($response);
	}

	public function delete_item()
	{
		$response = Array();

		// Get DELETE vars
		$del_vars = json_decode(file_get_contents("php://input"), true);
		$id = $del_vars["id"];

		if ($stmt = $this->Database->prepare("DELETE FROM items WHERE id=?"))
	    {
		    $stmt->bind_param("i", $id);
		    $stmt->execute();
			$stmt->close();
			
			$response = Array(
				'status' => 1,
				'status_message' =>'Item Deleted Successfully.'
			);
		}
		else
		{
			$response = Array(
				'status' => 0,
				'status_message' =>'Item Delete Failed.'
			);
		}

		header('Content-Type: application/json');
		echo json_encode($response);
	}
}